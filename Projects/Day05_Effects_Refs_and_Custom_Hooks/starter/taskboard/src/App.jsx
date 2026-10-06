import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import ProductSearch from "./components/ProductSearch.jsx";
import WeatherDashboard from "./components/WeatherDashboard.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";   

// TODO (Lab 5.1): render ProductSearch here while you work on the lab.
// TODO (Lab 5.2): render WeatherDashboard here while you work on the lab.
// TODO (Lab 5.3 steps 2-5): replace useState with useLocalStorage("tasks", null), seed the board from
//   JSONPlaceholder when tasks is null, and show a loading message while seeding.
// TODO (Lab 5.3 step 8): add a Reset board button.
 
const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;
    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
       throw new Error("Failed to fetch seed data");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data.map((t) => ({
          id: String(t.id),
          title: t.title,
          status: t.completed ? "done" : "todo",
          points: 1,
        })));
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching seed data:", error);
        }
      });
      return () => {
        controller.abort();
      }
  }, [needsSeed, setTasks]);

   if (tasks === null) {
    return <div className="loading">Seeding initial board data...</div>;
  }

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

  return (
    <>
      <Header tasks={tasks} />
      {/* <button onClick={() => setTasks(null)}>Reset board</button> */}
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />

      <section className="practice">
        <h2>Lab 5.1 product search</h2>
        <ProductSearch />
      </section>
      {/* <section className="practice">
        <h2>Lab 5.2 weather dashboard</h2>
        <WeatherDashboard />
      </section> */}
      <section className="practice">
        <h2>Lab 5.3 task board reset button</h2>
        <button onClick={() => setTasks(null)}>Reset board</button>
      </section>
    </>
  );
}

export default App;
