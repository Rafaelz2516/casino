import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { isLoggedInAtom, userAtom } from '../atom';

const Header = () => {
  const setUser = useSetRecoilState(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const navigate = useNavigate();
  const onLogout = (): void => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setUser({ username: '', birthDate: new Date(), balance: 0 });
    navigate('/', { replace: true });
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Casino
            </span>
          </NavLink>

          <div className="flex items-center lg:order-2">
            {!isLoggedIn && (
              <>
                <NavLink to="/login" className="flex items-center">
                  <span className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Log in
                  </span>
                </NavLink>
                <NavLink to="/register" className="flex items-center">
                  <span className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Register
                  </span>
                </NavLink>
              </>
            )}

            {isLoggedIn && (
              <button
                type="button"
                onClick={onLogout}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
