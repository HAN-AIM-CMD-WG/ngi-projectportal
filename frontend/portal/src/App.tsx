import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './components/component/landing';
import { AdminDashboard } from './components/component/admin-dashboard';
import { Login } from './components/component/login';
import { Register } from './components/component/register';
import { NotFound } from './components/component/not-found';
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { checkAuthentication } from './app/slices/authSlice';
import { Loading } from './components/component/loading';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Verified } from './components/component/verified';
import { ProjectDetailPage } from './components/component/project-detail-v2';

const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const userRoles = useAppSelector(state => state.auth.roles);
  const authChecking = useAppSelector(state => state.auth.authChecking);

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  function AuthRouteWrapper({ children }: { children: ReactNode }) {
    if (authChecking) {
      return <Loading />;
    }

    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    if (userRoles.includes('ROLE_ADMIN')) {
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
        <Route
          path="/"
          element={
            <GeneralRouteWrapper>
              <Landing />
            </GeneralRouteWrapper>
          }
        />
        <Route
          path="/verify/:email"
          element={
            <GeneralRouteWrapper>
              <Verified />
            </GeneralRouteWrapper>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthRouteWrapper>
              <AdminDashboard />
            </AuthRouteWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <AuthRouteWrapper>
              <ProjectDetailPage />
            </AuthRouteWrapper>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
