import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import ProductSearch from "./components/ProductSearch.jsx";
import WeatherDashboard from "./components/WeatherDashboard.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=8";

function toTask(todo) {
  return {
    id: String(todo.id),
    title: todo.title,
    assignee: `User ${todo.userId}`,
    points: (todo.id % 5) + 1,
    status: todo.completed ? "done" : "todo",
  };
}

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);
  const [seedError, setSeedError] = useState(false);

  useEffect(() => {
    if (tasks !== null) return;

    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((todos) => setTasks(todos.map(toTask)))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setSeedError(true);
      });

    return () => controller.abort();
  }, [tasks, setTasks]);

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

  function handleReset() {
    setSeedError(false);
    setTasks(null);
  }

  if (seedError) return <p>Could not load starter tasks. Refresh to try again.</p>;
  if (tasks === null) return <p>Loading tasks...</p>;

  return (
    <>
      <Header tasks={tasks} />
      <AddTaskForm onAdd={handleAdd} />
      <button onClick={handleReset}>Reset board</button>
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      <ProductSearch />
      <WeatherDashboard />
    </>
  );
}

export default App;