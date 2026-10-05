import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

/**
 * RequireAuth
 * A route guard. If no user is logged in, redirect to /login,
 * remembering the page the user tried to visit.
 */
function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;