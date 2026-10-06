import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import Counter from "./components/Counter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Accordion from "./components/Accordion.jsx";
import { tasks as initialTasks } from "./data/tasks.js";
import Shop from "./components/catalogue/Shop.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import { useState } from "react";

// TODO (Lab 4.1): render Counter, ThemeToggle and Accordion here while you work on the lab.
// TODO (Lab 4.2): render <Shop /> here while you work on the lab.
// TODO (Lab 4.3 step 1): move tasks into useState, importing the data as { tasks as initialTasks }.
// TODO (Lab 4.3 steps 2-6): add the add, status change, rename and delete handlers, render AddTaskForm,
//   and pass the handlers down to Board.
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
      <Board tasks={tasks} />
      <section className="practice">
        <h2>Lab 4.1 practice</h2>
        <Counter />
        <ThemeToggle />
        <Accordion />
      </section>
      
      <section className="practice">
        <h2>Lab 4.2 practice</h2>
        <Shop />
      </section>

      <section className="practice">
        <h2>Lab 4.3 practice</h2>
        <Header tasks={tasks} />
        <AddTaskForm onAdd={handleAdd} />
        <Board
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      </section>
    </>
  );
}
export default App;
