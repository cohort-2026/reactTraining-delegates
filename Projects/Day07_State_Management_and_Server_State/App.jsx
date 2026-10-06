import { useState } from "react";
import "./App.css";
import Header from "../Day06_TypeScript_and_Routing/taskboard-ts/src/components/Header.js";
import AddTaskForm from "../Day06_TypeScript_and_Routing/taskboard-ts/src/components/AddTaskForm.js";
import Board from "../Day06_TypeScript_and_Routing/taskboard-ts/src/components/Board.js";
import ProductSearch from "../Day06_TypeScript_and_Routing/taskboard-ts/src/components/ProductSearch.js";
import WeatherDashboard from "../Day06_TypeScript_and_Routing/taskboard-ts/src/components/WeatherDashboard.js";
import { tasks as initialTasks } from "../Day06_TypeScript_and_Routing/taskboard-ts/src/data/tasks.js";

// TODO (Lab 5.1): render ProductSearch here while you work on the lab.
// TODO (Lab 5.2): render WeatherDashboard here while you work on the lab.
// TODO (Lab 5.3 steps 2-5): replace useState with useLocalStorage("tasks", null), seed the board from
//   JSONPlaceholder when tasks is null, and show a loading message while seeding.
// TODO (Lab 5.3 step 8): add a Reset board button.
function App() {
  const [tasks, setTasks] = useState(initialTasks);

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
