import { useEffect } from "react";
import { useTaskStore } from "../state/useTaskStore";

function Header() {
  const tasks = useTaskStore((s) => s.tasks);
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const openCount = tasks.filter((t) => t.status !== "done").length;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return (
    <header className="header">
      <p className="brand">TaskBoard</p>
      <p>{doneCount} of {tasks.length} done</p>
    </header>
  );
}

export default Header;
