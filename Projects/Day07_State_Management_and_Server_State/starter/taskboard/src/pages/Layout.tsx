import { Link, NavLink, Outlet } from "react-router";
import "../App.css";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { projects } from "../data/projects";

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <Header />

      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        {projects.map((p) => (
          <NavLink key={p.id} to={`/projects/${p.id}`}>
            {p.name}
          </NavLink>
        ))}

        <NavLink to="/settings">Settings</NavLink>

        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>

        <span className="user">
          {user ? (
            <>
              Signed in as {user.name}{" "}
              <button type="button" onClick={logout}>
                Log out
              </button>
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
