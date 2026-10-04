import { useEffect } from "react";
import type { Task } from "../types";

type HeaderProps = {
  tasks: Task[];
};

export default function Header({ tasks }: HeaderProps) {
  const doneCount = tasks.filter((task) => task.status === "done").length;
  const openCount = tasks.length - doneCount;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>
        {doneCount} of {tasks.length} done
      </p>
    </header>
  );
}
