// TODO (Lab 7.1 step 3): add a theme toggle button to the nav.
// TODO (Lab 7.2 step 5): remove the tasks state, the seeding effect, BoardContext and the Outlet context.
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { NavLink, Outlet } from "react-router";
import "../App.css";
import Header from "../components/Header";
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
  const [seedAttempt, setSeedAttempt] = useState(0);
  const [seedError, setSeedError] = useState<string | null>(null);
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
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setSeedError(cause instanceof Error ? cause.message : String(cause));
        }
      });
    return () => controller.abort();
  }, [needsSeed, seedAttempt, setTasks]);

  return (
    <div className="app">
      <Header tasks={tasks ?? []} />
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        {projects.map((p) => (
          <NavLink key={p.id} to={`/projects/${p.id}`}>{p.name}</NavLink>
        ))}
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <main>
        {tasks === null ? (
          seedError ? (
            <p role="alert">
              Could not load starter tasks: {seedError}{" "}
              <button onClick={() => {
                setSeedError(null);
                setSeedAttempt((attempt) => attempt + 1);
              }}>Retry</button>
            </p>
          ) : (
            <p>Loading starter tasks...</p>
          )
        ) : (
          <Outlet context={{ tasks, setTasks } satisfies BoardContext} />
        )}
      </main>
    </div>
  );
}
