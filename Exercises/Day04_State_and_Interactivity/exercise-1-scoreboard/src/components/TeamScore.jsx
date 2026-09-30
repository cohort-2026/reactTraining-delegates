import { useState } from "react";

function TeamScore({ label }) {
  const [teamName, setTeamName] = useState("");
  const [score, setScore] = useState(0);

  function addPoint() {
    // Use the latest queued score so +3 applies all three increments.
    setScore((currentScore) => currentScore + 1);
  }

  function handleAddOne() {
    addPoint();
  }

  function handleAddThree() {
    addPoint();
    addPoint();
    addPoint();
  }

  function handleMinusOne() {
    setScore((s) => Math.max(0, s - 1));
  }

  function handleReset() {
    setScore(0);
  }

  return (
    <section className="team" aria-label={`${label} team`}>
      <h2>{teamName || label}</h2>

      <label htmlFor={`${label}-name`}>Team name</label>
      {/* Keep the controlled input editable and the heading in sync. */}
      <input id={`${label}-name`} 
      value={teamName} 
      onChange={(event) => setTeamName(event.target.value)}
      />

      <p className="score">Score: {score}</p>

      <button onClick={handleAddOne}>+1</button>
      <button onClick={handleAddThree}>+3</button>
      <button onClick={handleMinusOne}>-1</button>
      {/* Pass the handler; invoking it here would update state during render. */}
      <button onClick={handleReset}>Reset</button>
    </section>
  );
}

export default TeamScore;
