import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import Counter from "./components/Counter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Accordion from "./components/Accordion.jsx";
import { tasks } from "./data/tasks.js";

function App() {
  return (
    <>
      <Header tasks={tasks} />
      <Board tasks={tasks} />

      {/* Lab 4.1: temporary practice components. Remove them from App when you start Lab 4.2. */}
      <section className="practice">
        <h2>Lab 4.1 practice</h2>
        <Counter />
        <ThemeToggle />
        <Accordion />
      </section>
    </>
  );
}
export default App;
