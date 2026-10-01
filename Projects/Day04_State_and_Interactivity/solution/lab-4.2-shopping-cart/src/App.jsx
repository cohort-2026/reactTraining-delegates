import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import Shop from "./components/catalogue/Shop.jsx";
import { tasks } from "./data/tasks.js";

function App() {
  return (
    <>
      <Header tasks={tasks} />
      <Board tasks={tasks} />

      {/* Lab 4.2: temporary. Remove Shop from App when you start Lab 4.3. */}
      <section className="practice">
        <h2>Lab 4.2 shop</h2>
        <Shop />
      </section>
    </>
  );
}
export default App;
