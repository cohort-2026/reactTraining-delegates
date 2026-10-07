import { NavLink, Outlet } from "react-router";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";

function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const { data: tasks, isPending, error } = useTasks();

  if (isPending) return <p>Loading tasks...</p>;
  if (error) {
    return <p>Could not load tasks. Is the API running? (npm run api)</p>;
  }

  return (
    <>
      <Header tasks={tasks} />
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        {" | "}
        <NavLink to="/settings">Settings</NavLink>
        {" | "}
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
        {" | "}
        {user ? (
          <>
            <span>Hi, {user}</span>{" "}
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <button onClick={() => login("Chelsea")}>Log in</button>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;