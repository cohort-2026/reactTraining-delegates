// TODO (Lab 6.1 steps 2 and 5): in taskboard-ts this becomes App.tsx. Type every handler parameter
// (id: string, status: Status) and pass the type to the Hook: useLocalStorage<Task[] | null>("tasks", null).
// TODO (Lab 6.2 steps 2-5): move the tasks state, the seeding effect and the handlers into src/pages/Layout.tsx,
// share tasks with the pages through Outlet context, and add a projectId to every seeded and new task.
// TODO (Lab 6.3 step 6): show the user's name and a Log out button in Layout.
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.js";
import AddTaskForm from "./components/AddTaskForm.js";
import Board from "./components/Board.js";
import useLocalStorage from "./hooks/useLocalStorage.ts";
import type { Task } from "./types";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[] | null>("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;
    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(
        (
          todos: Array<{
            id: number;
            title: string;
            completed: boolean;
          }>,
        ) =>
          setTasks(
            todos.map((t) => ({
              id: String(t.id),
              title: t.title,
              assignee: "Starter",
              status: t.completed ? "done" : "todo",
              points: 1,
            })),
          ),
      )
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => controller.abort();
  }, [needsSeed, setTasks]);

  function handleAdd(newTask: Omit<Task, "id" | "status">) {
    const id = crypto.randomUUID();

    setTasks((prev) => {
      if (prev === null) return prev;

      return [...prev, { ...newTask, id, status: "todo" }];
    });
  }

  function handleStatusChange(id: Task["id"], status: Task["status"]) {
    setTasks((prev) => {
      if (prev === null) return prev;

      return prev.map((t) => (t.id === id ? { ...t, status } : t));
    });
  }

  function handleRename(id: Task["id"], title: string) {
    setTasks((prev) => {
      if (prev === null) return prev;

      return prev.map((t) => (t.id === id ? { ...t, title } : t));
    });
  }

  function handleDelete(id: Task["id"]) {
    setTasks((prev) => {
      if (prev === null) return prev;

      return prev.filter((t) => t.id !== id);
    });
  }

  if (tasks === null) return <p>Loading starter tasks...</p>;

  return (
    <>
      <Header tasks={tasks} />
      <button className="reset-button" onClick={() => setTasks(null)}>
        Reset board
      </button>
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
