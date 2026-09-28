import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../auth/useAuth";

export default function Layout() {
  // TODO 6: Use useAuth() here. When the user is logged in, show their name and
  // a "Log out" button instead of the "Log in" link. Logging out should clear
  // the session and take the user back to the home page (/).
  // While the session is still loading, show neither.
const { status, user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    navigate("/");
    await logout();
  }
  return (
    <div className="app">
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <div className="nav-user">
          {status === "authenticated" && user ? (
            <>
              <span>{user.name}</span>
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : status !== "loading" ? (
            <NavLink to="/login">Log in</NavLink>
          ) : null}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
