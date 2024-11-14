import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/app/slices/authSlice";
import { setSelectedCompany } from "@/app/slices/companySlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Company } from "@/app/types/company";

export function Navbar() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userRoles = useAppSelector((state) => state.auth.roles);
  const userCompany = useAppSelector((state) => state.auth.companies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/");
        console.log("Logged out successfully");
      })
      .catch((error: unknown) => {
        console.error("Logout error:", error);
      });
  };

  const handleSelectedCompany = (company: Company) => {
    dispatch(setSelectedCompany(company));
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
            {userCompany.map((company) => (
              <Link
                key={company.uuid}
                className="text-lg text-gray-600 dark:text-gray-400 hover:underline"
                to={`/company/${company.uuid}`}
                onClick={(event) => {
                  handleSelectedCompany(company);
                }}
              >
                {company.name}
              </Link>
            ))}
            <Link
              className="text-lg text-gray-600 dark:text-gray-400 hover:underline"
              to="/register-company"
            >
              Register Company
            </Link>
            {userRoles.includes("ADMIN") && (
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
