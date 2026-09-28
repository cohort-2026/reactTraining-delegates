import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./useAuth";
// TODO 3: Guard the private pages. This is a layout route (see src/routes.tsx):
// every route nested under it should only render for a logged-in user.
//
//   - While the session is still loading, show a loading message with
//     role="status" instead of deciding anything.
//   - For an anonymous user, redirect to /login?redirect=<the page they asked
//     for, including its query string>.
//   - Otherwise, render the child route.
//
// Right now it lets everybody in.
export default function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <p role="status">Checking your session…</p>;
  }

  if (status === "anonymous") {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?${new URLSearchParams({ redirect })}`} replace />;
  }
  return <Outlet />;
}
