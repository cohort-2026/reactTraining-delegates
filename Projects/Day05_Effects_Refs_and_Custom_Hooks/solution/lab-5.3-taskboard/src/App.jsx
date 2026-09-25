import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;
    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((todos) =>
        setTasks(
          todos.map((t) => ({
            id: String(t.id),
            title: t.title,
            status: t.completed ? "done" : "todo",
            points: 1,
          }))
        )
      )
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => controller.abort();
  }, [needsSeed, setTasks]);

  function handleAdd(newTask) {
    const id = crypto.randomUUID();
    setTasks((prev) => [...prev, { ...newTask, id, status: "todo" }]);
  }

  function handleStatusChange(id, status) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  function handleRename(id, title) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
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
