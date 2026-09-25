import { NavLink, Outlet } from "react-router";

export default function Layout() {
  // TODO 6: Use useAuth() here. When the user is logged in, show their name and
  // a "Log out" button instead of the "Log in" link. Logging out should clear
  // the session and take the user back to the home page (/).
  // While the session is still loading, show neither.

  return (
    <div className="app">
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <div className="nav-user">
          <NavLink to="/login">Log in</NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
