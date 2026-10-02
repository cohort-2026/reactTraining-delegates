import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import { tasks as initialTasks } from "./data/tasks.js";
import Counter from "./components/Counter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Accordion from "./components/Accordion.jsx";
import Shop from "./components/catalogue/Shop.jsx";
import ProductSearch from "./components/ProductSearch.jsx";

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAdd(newTask) {
    setTasks((current) => [
      ...current,
      { ...newTask, id: crypto.randomUUID(), status: "todo" },
    ]);
  }

  function handleStatusChange(id, status) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function handleRename(id, title) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, title } : task))
    );
  }

  function handleDelete(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
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
      <section className="practice" aria-label="Product search exercise">
        <h2>Product search</h2>
        <ProductSearch />
      </section>
      <section className="practice" aria-label="Shopping cart exercise">
        <h2>Shopping cart</h2>
        <Shop />
      </section>
      <section className="practice" aria-label="State practice">
        <h2>State exercises</h2>
        <Counter />
        <ThemeToggle />
        <Accordion />
      </section>
    </>
  );
}
export default App;
