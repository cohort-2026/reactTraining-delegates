// TODO (morning recap): add the take-home tasks array above App (Module 3.4 later moves it to src/data/tasks.js).
// TODO (Lab 3.1 steps 5-6): import "./App.css", Button and Card, and render a Card containing two Buttons.
// TODO (Lab 3.2 step 5): render ProductGrid here for now (remove it again when you start Lab 3.3).
// TODO (Lab 3.3): App.jsx ends up rendering only Header and Board, with the tasks from src/data/tasks.js.

import tasks from "./data/tasks";
import Header from "./components/Header";
import Board from "./Components/Board";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Board />
    </div>
  );
}

export default App;