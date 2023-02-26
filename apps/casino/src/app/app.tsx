import { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getUser } from './api/user';
import { isLoggedInAtom, userAtom } from './atom';
import Header from './components/Header';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import GameDetail from './pages/GameDetail';
import GamesList from './pages/GameList';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App = () => {
  const [loading, setLoading] = useState(true);
  const [IsLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const setUser = useSetRecoilState(userAtom);
  let initialized = false;

  useEffect(() => {
    if (!initialized) {
      //https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initialized = true;

      const initApp = async () => {
        const hasToken = !!sessionStorage.getItem('jwtToken');
        if (!hasToken) return;
        try {
          const user = await getUser();
          const { username, birthDate, balance } = user;
          setIsLoggedIn(true);
          setUser({
            username: username,
            birthDate: new Date(birthDate),
            balance: balance,
          });
        } catch (e: any) {
          sessionStorage.removeItem('jwtToken');
          setIsLoggedIn(false);
          setUser({ username: '', birthDate: new Date(), balance: 0 });
        }
      };

      initApp().then(() => setLoading(false));
    }
  }, [setIsLoggedIn, setUser]);

  if (loading) return <Loading />;
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute isLoggedIn={IsLoggedIn} />}>
          <Route path="/games" element={<GamesList />} />
          <Route path="/game/:name" element={<GameDetail />} />
        </Route>--
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
