import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

function App() {
  const [tasks, setTasks] = useLocalStorage("taskboard-tasks", []);
  const [seeded, setSeeded] = useLocalStorage("taskboard-seeded", false);
  const [seedError, setSeedError] = useState("");

  // Seed from JSONPlaceholder on first run (or after a reset)
  useEffect(() => {
    if (seeded) return;
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=8", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then((todos) => {
        setTasks(
          todos.map((todo) => ({
            id: crypto.randomUUID(),
            title: todo.title,
            assignee: "",
            points: 1,
            status: todo.completed ? "done" : "todo",
          }))
        );
        setSeeded(true);
        setSeedError("");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setSeedError("Could not load starter tasks.");
      });

    return () => controller.abort();
  }, [seeded, setTasks, setSeeded]);

  function handleReset() {
    if (window.confirm("Reset the board to the starter tasks?")) {
      setTasks([]);
      setSeeded(false); // triggers the seed effect again
    }
  }

  function handleAdd(newTask) {
    setTasks((previousTasks) => [
      ...previousTasks,
      { ...newTask, id: crypto.randomUUID(), status: "todo" },
    ]);
  }

  function handleStatusChange(id, status) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }

  function handleRename(id, title) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <>
      <Header tasks={tasks} onReset={handleReset} />
      {seedError && <p role="alert">{seedError}</p>}
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
