// TODO (Lab 6.1 step 4): add a HeaderProps type.
// TODO (Lab 6.2): render the header in Layout, above the navigation.
import { useEffect } from "react";

function Header({ tasks }) {
  const doneCount = tasks.filter((t) => t.status === "done").length;
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
