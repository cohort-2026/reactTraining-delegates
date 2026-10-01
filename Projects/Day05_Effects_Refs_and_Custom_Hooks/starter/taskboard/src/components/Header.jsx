// TODO (Lab 5.3 step 7): update the tab title with the open count in an effect.
import { useEffect } from "react";

function Header({ tasks, onReset }) {
  const doneCount = tasks.filter((task) => task.status === "done").length;
  const openCount = tasks.length - doneCount;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>{doneCount} of {tasks.length} done</p>
      <button onClick={onReset}>Reset board</button>
    </header>
  );
}

export default Header;
