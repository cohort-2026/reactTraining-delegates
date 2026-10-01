import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import ProductSearch from "./components/ProductSearch";
import WeatherDashboard from "./components/WeatherDashboard";

// TODO (Lab 5.1): render ProductSearch here while you work on the lab.
// TODO (Lab 5.2): render WeatherDashboard here while you work on the lab.
// TODO (Lab 5.3 steps 2-5): replace useState with useLocalStorage("tasks", null), seed the board from
// JSONPlaceholder when tasks is null, and show a loading message while seeding.
// TODO (Lab 5.3 step 8): add a Reset board button.

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);

  // Seed tasks from JSONPlaceholder on first run
  useEffect(() => {
    if (tasks !== null) {
      return;
    }

    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load starter tasks");
        }

        return res.json();
      })
      .then((todos) => {
        const seededTasks = todos.map((todo, index) => ({
          id: todo.id,
          title: todo.title,
          assignee: "Starter",
          points: (index + 1) * 2,
          status: "todo",
        }));

        setTasks(seededTasks);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [tasks, setTasks]);

  // Update browser tab with the number of open tasks
  useEffect(() => {
    if (tasks === null) {
      return;
    }

    const openCount = tasks.filter((task) => task.status !== "done").length;

    document.title = `TaskBoard — ${openCount} open`;
  }, [tasks]);

  function handleReset() {
    localStorage.removeItem("tasks");
    setTasks(null);
  }

  function handleAdd(newTask) {
    const id = crypto.randomUUID();

    setTasks((prev) => [...prev, { ...newTask, id, status: "todo" }]);
  }

  function handleStatusChange(id, status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function handleRename(id, title) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  if (tasks === null) {
    return <p>Loading starter tasks...</p>;
  }

  return (
    <>
      <ProductSearch />
      <WeatherDashboard />

      <Header tasks={tasks} />

      <AddTaskForm onAdd={handleAdd} />

      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      <button type="button" onClick={handleReset}>
        Reset board
      </button>
    </>
  );
}

export default App;
