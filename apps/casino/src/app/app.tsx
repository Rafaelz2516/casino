// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { getUser } from './api/user';
import { isLoggedInAtom, userAtom } from './atom';
import Header from './components/Header';
import Loading from './components/Loading';
import Games from './pages/Games';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


const App = () => {
  const [loading, setLoading] = useState(true);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const initApp = async () => {
      const hasToken = !!sessionStorage.getItem('jwtToken');
      if (!hasToken) return;
      try {
        const user = await getUser();
        const { username, birthDate, balance } = user;
        setIsLoggedIn(true);
        setUser({  username: username, birthDate: new Date(birthDate), balance: balance });
      } catch (e: any) {
        sessionStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUser({   username: '', birthDate: new Date(), balance: 0 });
      }
    };

    initApp().then(() => setLoading(false));
  }, [setIsLoggedIn, setUser]);

  if (loading) return <Loading />;
  return (
    <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games" element={<Games />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
