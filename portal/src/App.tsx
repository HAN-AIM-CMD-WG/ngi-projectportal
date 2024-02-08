/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './components/component/landing';
import { AdminDashboard } from './components/component/admin-dashboard';
import { Login } from './components/component/login';
import { Register } from './components/component/register';
import { NotFound } from './components/component/not-found';
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthentication } from './app/slices/authSlice';
import { Loading } from './components/component/loading';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const userRoles = useSelector((state: any) => state.auth.roles);
  const authChecking = useSelector((state: any) => state.auth.authChecking);

  useEffect(() => {
    console.log('App.tsx: useEffect: checkAuthentication');
    dispatch(checkAuthentication() as any);
  }, [dispatch]);

  function AuthRouteWrapper({ children }: { children: ReactNode }) {
    console.log('AuthRouteWrapper: userRoles:', userRoles);
    if (authChecking) {
      return <Loading />;
    }

    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    if (userRoles.includes("ROLE_ADMIN")) {
      return children;
    }

    return <Navigate to="/" />;
  }

  function GuestRoute({ children }: { children: ReactNode }) {
    if (authChecking) {
      return <Loading />;
    }

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    return children;
  }

  function GeneralRouteWrapper({ children }: { children: ReactNode }) {
    if (authChecking) {
      return <Loading />;
    }

    return children;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GeneralRouteWrapper><Landing /></GeneralRouteWrapper>} />
        <Route path="/admin" element={<AuthRouteWrapper><AdminDashboard /></AuthRouteWrapper>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;