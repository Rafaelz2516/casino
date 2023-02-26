import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import logo from '../../assets/call-of-duty.jpeg';
import { getGame } from '../api/games';
import { createBet } from '../api/user';
import { userAtom } from '../atom';
import { Game } from '../models/game';

const GameDetail = () => {
  let initialized = false;
  const { name: nameParam } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [currentBet, setCurrentBet] = useState<number>(0);
  const [user, setUser] = useRecoilState(userAtom);
  const values = [1, 3, 5, 10];
  useEffect(() => {
    const initGame = async (): Promise<void> => {
      try {
        const game = await getGame(nameParam!);
        setGame(game);
      } catch {
        navigate('/', { replace: true });
      }
    };

    if (!initialized) {
      //https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initialized = true;
      initGame();
    }
  }, [nameParam, navigate]);

  const onSettingBet = (value: number): void => {
    // Validate both on FE and BE
    if (currentBet + value > user.balance) {
      setErrorMsg('Not enough balance!');
      return;
    }
    setErrorMsg('');
    setCurrentBet((previousValue) => previousValue + value);
  };

  const onBetting = (): void => {
    const bettingResult = async (): Promise<void> => {
      try {
        const user = await createBet({ value: currentBet });
        setUser(user);
        setCurrentBet(0);
      } catch (e: any) {
        setErrorMsg(e.response.data.message);
      }
    };
    if (currentBet > 0) {
      bettingResult();
    }
  };

  return (
    <div className="container mx-auto p-8">
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img className="w-full" src={logo} alt="dashboard image" />

          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {game?.name}
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              {game?.description}
            </p>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
              Balance: {user.balance}
            </h2>

            {values.map((value) => (
              <button
                key={value}
                onClick={() => onSettingBet(value)}
                type="button"
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
              >
                <img
                  className="w-full"
                  width="16"
                  alt="Dollar Sign"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dollar_Sign.svg/16px-Dollar_Sign.svg.png"
                />
                {value}
              </button>
            ))}

            <button
              type="button"
              onClick={onBetting}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Bet {currentBet}
            </button>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameDetail;
