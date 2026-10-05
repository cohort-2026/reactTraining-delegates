import type { Task } from "../types";

type HeaderProps = {
  tasks: Task[];
};

function Header({ tasks }: HeaderProps) {
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const openCount = tasks.filter((t) => t.status !== "done").length;

  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>
        {doneCount} of {tasks.length} done
      </p>
      <p>{openCount} open</p>
    </header>
  );
}

export default Header;
