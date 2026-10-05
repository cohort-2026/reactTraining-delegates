import TeamList from "./components/TeamList";
import { team } from "./data/team";

function App() {
  return (
    <main>
      <h1>Our team</h1>
      <p>{team.length} people</p>
      <TeamList team={team} />
    </main>
  );
}

export default App;