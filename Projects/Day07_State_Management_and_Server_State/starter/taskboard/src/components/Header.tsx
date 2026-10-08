import { useEffect } from "react";
import { useTasks } from "../hooks/useTasks";

function Header() {
  const { data: tasks = [] } = useTasks();
  const doneCount = tasks.filter((task) => task.status === "done").length;
  const openCount = tasks.filter((task) => task.status !== "done").length;

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
