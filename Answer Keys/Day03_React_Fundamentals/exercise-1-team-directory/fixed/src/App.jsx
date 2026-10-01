import "./App.css";
import TeamList from "./components/TeamList.jsx";
import { team } from "./data/team.js";

function App() {
  return (
    <main>
      <h1>Our team</h1>
      <p>{team.length} people</p>
      <TeamList members={team} />
    </main>
  );
}
export default App;
