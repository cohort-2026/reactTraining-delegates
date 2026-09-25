import TeamScore from "./components/TeamScore.jsx";

function App() {
  return (
    <main>
      <h1>Five-a-side Scoreboard</h1>
      <div className="teams">
        <TeamScore label="Home" />
        <TeamScore label="Away" />
      </div>
    </main>
  );
}

export default App;
