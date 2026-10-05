import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import type { NewTaskFields } from "./components/AddTaskForm";
import Board from "./components/Board";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SEED_URL, toTasks } from "./data/seed";
import type { Todo } from "./data/seed";
import type { Status, Task } from "./types";

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
      .then((todos: Todo[]) => setTasks(toTasks(todos)))
      .catch((err: unknown) => {
        if (!controller.signal.aborted) console.error(err);
      });
    return () => controller.abort();
  }, [needsSeed, setTasks]);

  function handleAdd(newTask: NewTaskFields) {
    const id = crypto.randomUUID();
    setTasks((prev) => [...(prev ?? []), { ...newTask, id, status: "todo" }]);
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((prev) =>
      (prev ?? []).map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  function handleRename(id: string, title: string) {
    setTasks((prev) =>
      (prev ?? []).map((t) => (t.id === id ? { ...t, title } : t))
    );
  }

  function handleDelete(id: string) {
    setTasks((prev) => (prev ?? []).filter((t) => t.id !== id));
  }

  if (tasks === null) return <p>Loading starter tasks...</p>;

  return (
    <>
      <Header tasks={tasks} />
      <button className="reset-button" onClick={() => setTasks(null)}>Reset board</button>
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
