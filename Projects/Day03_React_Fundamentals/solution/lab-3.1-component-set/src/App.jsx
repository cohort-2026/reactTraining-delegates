import "./App.css";
import Button from "./components/Button.jsx";
import Card from "./components/Card.jsx";

function App() {
  return (
    <main>
      <Card title="Sprint 12">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Card>
      <Card>
        <p>This card has no title.</p>
      </Card>
    </main>
  );
}
export default App;
