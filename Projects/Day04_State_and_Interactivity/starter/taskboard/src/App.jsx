import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import { tasks as initialTasks } from "./data/tasks.js";

function App() {
  const [tasks, setTasks] = useState(initialTasks);

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
    </>
  );
}

export default App;
