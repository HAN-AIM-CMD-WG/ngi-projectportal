import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/app/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

export function Navbar() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const userRoles = useAppSelector(state => state.auth.roles);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        console.log('Logged out successfully');
      })
      .catch((error: unknown) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <header className="flex justify-between items-center h-16 px-4 bg-white dark:bg-gray-800 shadow-md">
      <Link
        className="text-2xl font-semibold text-gray-900 dark:text-gray-200"
        to="/"
      >
        Projojo
      </Link>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {userRoles?.includes('ADMIN') && (
              <Link
                className="text-lg text-gray-600 dark:text-gray-400 hover:underline"
                to="/admin"
              >
                Admin Dashboard
              </Link>
            )}
            <Button variant="outline" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="mr-2" variant="outline">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
