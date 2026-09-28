import "./App.css";
import Board from "./components/Board.jsx";
import Header from "./components/Header.jsx";
import { tasks } from "./data/tasks.js";

function App() {
  return (
    <main className="app">
      <Header tasks={tasks} />
      <Board tasks={tasks} />
    </main>
  );
}

export default App;
