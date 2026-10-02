import { useEffect, useRef, useState } from "react";

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function FocusTimer({ minutes }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [taskName, setTaskName] = useState("");
  const taskInputRef = useRef(null);

  // Bug 1: the input does not exist during the first render, so reading
  // taskInputRef.current in the component body skipped focus on load and
  // then stole focus on every later render. Focus after mount instead.
  useEffect(() => {
    taskInputRef.current.focus();
  }, []);

  // Bug 2: starting an interval without cleanup left the old timer running
  // when Pause/Reset flipped isRunning, so Start stacked extra intervals.
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // Bug 3: an empty dependency array ran this only once, so the tab title
  // stayed at 25:00. List secondsLeft so the title tracks the countdown.
  useEffect(() => {
    document.title = `${formatTime(secondsLeft)} - Focus Timer`;
  }, [secondsLeft]);

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
  }

  const isFinished = secondsLeft === 0;

  return (
    <section>
      <label htmlFor="task">What are you working on?</label>
      <input
        id="task"
        ref={taskInputRef}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <p className="time" role="timer">
        {formatTime(secondsLeft)}
      </p>
      {isFinished && <p role="status">Time is up. Take a break!</p>}

      <button onClick={() => setIsRunning((r) => !r)} disabled={isFinished}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </section>
  );
}

export default FocusTimer;
