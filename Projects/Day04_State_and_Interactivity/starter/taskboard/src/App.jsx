import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import Counter from "./components/Counter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Accordion from "./components/Accordion.jsx";
import Shop from "./components/catalogue/Shop.jsx";
import { tasks } from "./data/tasks.js";

// TODO (Lab 4.3 step 1): move tasks into useState, importing the data as { tasks as initialTasks }.
// TODO (Lab 4.3 steps 2-6): add the add, status change, rename and delete handlers, render AddTaskForm,
//   and pass the handlers down to Board.
function App() {
  return (
    <>
      <Header tasks={tasks} />
      <Board tasks={tasks} />

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
    </>
  );
}
export default App;
