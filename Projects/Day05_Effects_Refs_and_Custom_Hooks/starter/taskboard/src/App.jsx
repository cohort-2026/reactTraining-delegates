import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import ProductSearch from "./components/ProductSearch.jsx";
import WeatherDashboard from "./components/WeatherDashboard.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;

    const controller = new AbortController();

    fetch(SEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(() => {
        const starterTasks = [
          { id: "1", title: "Plan sprint goals", status: "todo", assignee: "", points: 3 },
          { id: "2", title: "Review design mockups", status: "doing", assignee: "", points: 2 },
          { id: "3", title: "Write project summary", status: "todo", assignee: "", points: 1 },
          { id: "4", title: "Prepare demo checklist", status: "done", assignee: "", points: 2 },
          { id: "5", title: "Share launch notes", status: "todo", assignee: "", points: 1 },
        ];

        setTasks(starterTasks);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [needsSeed, setTasks]);

  function handleAdd(newTask) {
    const id = crypto.randomUUID();
    setTasks((prev) => [...prev, { ...newTask, id, status: "todo" }]);
  }

  function handleStatusChange(id, status) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function handleRename(id, title) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  if (tasks === null) {
    return <p>Loading starter tasks...</p>;
  }

  return (
    <>
      <Header tasks={tasks} />
      <button type="button" onClick={() => setTasks(null)}>
        Reset board
      </button>
      <AddTaskForm onAdd={handleAdd} />
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
