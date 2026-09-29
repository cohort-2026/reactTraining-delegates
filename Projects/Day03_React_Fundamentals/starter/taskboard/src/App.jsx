// TODO (morning recap): add the take-home tasks array above App (Module 3.4 later moves it to src/data/tasks.js).
// TODO (Lab 3.1 steps 5-6): import "./App.css", Button and Card, and render a Card containing two Buttons.
// TODO (Lab 3.2 step 5): render ProductGrid here for now (remove it again when you start Lab 3.3).
// TODO (Lab 3.3): App.jsx ends up rendering only Header and Board, with the tasks from src/data/tasks.js.
import "./App.css";
import Button from "./components/ui/Button.jsx";
import Card from "./components/ui/Card.jsx";
import ProductGrid from "./components/catalogue/ProductGrid.jsx";
import { products } from "./components/catalogue/products.js";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import { tasks } from "./data/tasks.js";

function App() {
  return (
    <main>
    <>
      <Header tasks={tasks} />
      <Board tasks={tasks} />
    </>
      <Card title="Welcome to TaskBoard!">
        <Button label="Save" />
        <Button label="Cancel" variant="secondary" />
      </Card>
        <h1>TaskBoard</h1>
        <Card>
          <p>My first React app.</p>
        </Card>
        <h2>Product catalogue</h2>
      <ProductGrid products={products} />
    </main>
  );
}

export default App;
