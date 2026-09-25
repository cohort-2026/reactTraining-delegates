import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import { tasks } from "./data/tasks.js";

function App() {
  return (
    <>
      <Header tasks={tasks} />
      <Board tasks={tasks} />
    </>
  );
}
export default App;
