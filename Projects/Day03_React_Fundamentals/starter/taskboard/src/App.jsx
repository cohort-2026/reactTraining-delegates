import "./App.css";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import ProductGrid from "./components/catalogue/ProductGrid";

// TODO (morning recap): add the take-home tasks array above App (Module 3.4 later moves it to src/data/tasks.js).
// TODO (Lab 3.3): App.jsx ends up rendering only Header and Board, with the tasks from src/data/tasks.js.

function App() {
  return (
    <main>
      <h1>TaskBoard</h1>
      <p>My first React app.</p>

      <Card title="My Buttons">
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </Card>

      <ProductGrid />
    </main>
  );
}

export default App;
