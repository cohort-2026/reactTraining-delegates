import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import { tasks } from "./data/tasks.js";

// TODO (Lab 4.1): render Counter, ThemeToggle and Accordion here while you work on the lab.
// TODO (Lab 4.2): render <Shop /> here while you work on the lab.
// TODO (Lab 4.3 step 1): move tasks into useState, importing the data as { tasks as initialTasks }.
// TODO (Lab 4.3 steps 2-6): add the add, status change, rename and delete handlers, render AddTaskForm,
//   and pass the handlers down to Board.
function App() {
  return (
    <>
      <Header tasks={tasks} />
      <Board tasks={tasks} />
    </>
  );
}
export default App;
