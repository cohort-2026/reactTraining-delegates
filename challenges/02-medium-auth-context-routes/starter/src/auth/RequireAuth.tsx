import { Outlet } from "react-router";

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
  return <Outlet />;
}
