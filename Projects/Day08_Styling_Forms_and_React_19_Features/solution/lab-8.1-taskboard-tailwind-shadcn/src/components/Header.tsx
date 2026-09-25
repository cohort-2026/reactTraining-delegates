import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";

function Header() {
  const { data: tasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const openCount = tasks.filter((t) => t.status !== "done").length;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return (
    <div className="flex items-baseline gap-3">
      <p className="text-xl font-bold tracking-tight">TaskBoard</p>
      <p className="text-sm text-muted-foreground">{doneCount} of {tasks.length} done</p>
    </div>
  );
}

export default Header;
