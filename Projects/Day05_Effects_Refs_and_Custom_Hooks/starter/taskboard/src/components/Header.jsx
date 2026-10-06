// TODO (Lab 5.3 step 7): update the tab title with the open count in an effect.
import { useEffect } from "react";

function Header({ tasks }) {
  const doneCount = tasks.filter((t) => t.status === "done").length;
  console.log("Header render", doneCount, tasks.length);
  const openCount = tasks.filter((t) => t.status !== "done").length;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>{doneCount} of {tasks.length} done</p>
    </header>
  );
}

export default Header;
