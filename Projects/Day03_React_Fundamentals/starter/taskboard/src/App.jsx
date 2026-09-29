// TODO (morning recap): add the take-home tasks array above App (Module 3.4 later moves it to src/data/tasks.js).
// TODO (Lab 3.1 steps 5-6): import "./App.css", Button and Card, and render a Card containing two Buttons.
// TODO (Lab 3.2 step 5): render ProductGrid here for now (remove it again when you start Lab 3.3).
// TODO (Lab 3.3): App.jsx ends up rendering only Header and Board, with the tasks from src/data/tasks.js.
import "./App.css";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";

function App() {
  return (
    <main>
      <h1>TaskBoard</h1>
      <p>My first React app.</p>
       <Card>
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Card>
    </main>
  );
}

export default App;
