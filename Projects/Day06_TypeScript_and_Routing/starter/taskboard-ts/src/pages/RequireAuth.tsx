import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
