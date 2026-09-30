import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import Counter from "./components/Counter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Accordion from "./components/Accordion.jsx";
import Shop from "./components/catalogue/Shop.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import { useState } from "react";
import { tasks as initialTasks } from "./data/tasks.js";

// Lab 4.3: App owns the task data and passes update actions down to the board.
function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAdd(newTask) {
    const id = crypto.randomUUID();
    setTasks((previousTasks) => [
      ...previousTasks,
      { ...newTask, id, status: "todo" },
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
      <Header tasks={tasks} />
      <main>
        {/* Lab 4.3: controlled task form and interactive task board. */}
        <AddTaskForm onAdd={handleAdd} />
        <Board
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onRename={handleRename}
          onDelete={handleDelete}
        />

        {/* Lab 4.1: counter, theme toggle, and accordion practice. */}
        <section className="practice">
          <h2>Lab 4.1 practice</h2>
          <Counter />
          <ThemeToggle />
          <Accordion />
        </section>

        {/* Lab 4.2: product catalogue and shopping cart. */}
        <section className="practice">
          <h2>Lab 4.2 shopping cart</h2>
          <Shop />
        </section>
      </main>
    </>
  );
}
export default App;
