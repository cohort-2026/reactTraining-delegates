// TODO (Lab 7.2 step 6): read the tasks from the store instead of a prop.
// TODO (Lab 7.3 step 5): read them with useQuery.
import { useEffect } from "react";
import type { Task } from "../types";

type HeaderProps = {
  tasks: Task[];
};

function Header({ tasks }: HeaderProps) {
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
