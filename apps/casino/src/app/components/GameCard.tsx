import { Link } from 'react-router-dom';

import logo from '../../assets/call-of-duty.jpeg';
import { Game } from '../models/game';

const GameCard = ({ game }: { game: Game }) => {
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/game/${game.name}`} className="flex items-center">
        <img src={logo} alt="Logo" />
      </Link>
      <div className="p-2">
        <Link to={`/game/${game.name}`} className="flex items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {game.name}
          </h5>
        </Link>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
