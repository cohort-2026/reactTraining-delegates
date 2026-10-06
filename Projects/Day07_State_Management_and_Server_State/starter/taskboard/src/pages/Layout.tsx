// TODO (Lab 7.1 step 3): add a theme toggle button to the nav.
import { Link, NavLink, Outlet } from "react-router";
import "../App.css";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/useTheme";
import { projects } from "../data/projects";

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <div className="app">
      <Header />
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        {projects.map((p) => (
          <NavLink key={p.id} to={`/projects/${p.id}`}>{p.name}</NavLink>
        ))}
        <NavLink to="/settings">Settings</NavLink>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggle}
          aria-pressed={theme === "dark"}
        >
          Switch to {theme === "dark" ? "light" : "dark"} theme
        </button>
        <span className="user">
          {user ? (
            <>
              Signed in as {user.name}{" "}
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </span>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
