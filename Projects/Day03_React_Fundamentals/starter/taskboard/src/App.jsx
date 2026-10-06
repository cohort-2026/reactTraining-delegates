// TODO (morning recap): add the take-home tasks array above App (Module 3.4 later moves it to src/data/tasks.js).
// TODO (Lab 3.1 steps 5-6): import "./App.css", Button and Card, and render a Card containing two Buttons.
// TODO (Lab 3.2 step 5): render ProductGrid here for now (remove it again when you start Lab 3.3).
// TODO (Lab 3.3): App.jsx ends up rendering only Header and Board, with the tasks from src/data/tasks.js.
import "./App.css";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import ProductGrid from "./components/catalogue/ProductGrid";
import Header from "./components/Header";
import Board from "./components/Board";
import { tasks } from "./data/tasks.js";
function App() {
  return (
    <>
      <header>
        <h1>Welcome to my Task Board</h1>
      </header>
      <main>
        <Card title="My First Card">
          <p>This is the body of my first card.</p>
          <Button variant="primary">Primary Button</Button>
        </Card>
        <Card title="My Second Card" variant="secondary">
          <p>This is the body of my second card.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
          <Button variant="secondary">Secondary Button</Button>
        </Card>
        <h3>Product catalogue</h3>
        <ProductGrid />
        <Header tasks={tasks} />
        <Board tasks={tasks} />

      </main>
    </>
  );
}

export default App;
