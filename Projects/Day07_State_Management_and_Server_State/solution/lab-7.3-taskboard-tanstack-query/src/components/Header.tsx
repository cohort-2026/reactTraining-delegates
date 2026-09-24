import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";

function Header() {
  const { data: tasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
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
