import { Link, NavLink, Outlet } from "react-router";
import "../App.css";
import Header from "../components/Header";
import { ThemeButton } from "../components/ThemeButton";
import { useAuth } from "../hooks/useAuth";
import { projects } from "../data/projects";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <Header />
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        {projects.map((p) => (
          <NavLink key={p.id} to={`/projects/${p.id}`}>{p.name}</NavLink>
        ))}
        <NavLink to="/settings">Settings</NavLink>
        <ThemeButton />
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
