import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Link, NavLink, Outlet } from "react-router";
import "../App.css";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { projects } from "../data/projects";
import { SEED_URL, toTasks } from "../data/seed";
import type { Todo } from "../data/seed";
import type { Task } from "../types";

export type BoardContext = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[] | null>>;
};

export default function Layout() {
  const [tasks, setTasks] = useLocalStorage<Task[] | null>("tasks", null);
  const { user, logout } = useAuth();
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;
    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((todos: Todo[]) => setTasks(toTasks(todos)))
      .catch((err: unknown) => {
        if (!controller.signal.aborted) console.error(err);
      });
    return () => controller.abort();
  }, [needsSeed, setTasks]);

  return (
    <div className="app">
      <Header tasks={tasks ?? []} />
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        {projects.map((p) => (
          <NavLink key={p.id} to={`/projects/${p.id}`}>{p.name}</NavLink>
        ))}
        <NavLink to="/settings">Settings</NavLink>
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
        {tasks === null ? (
          <p>Loading starter tasks...</p>
        ) : (
          <Outlet context={{ tasks, setTasks } satisfies BoardContext} />
        )}
      </main>
    </div>
  );
}
