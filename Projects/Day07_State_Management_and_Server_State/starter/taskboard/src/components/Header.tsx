// TODO (Lab 7.3 step 5): read them with useQuery.
import { useEffect } from "react";
import { useTaskStore } from "../state/useTaskStore";

function Header() {
  const tasks = useTaskStore((state) => state.tasks);

  const doneCount = tasks.filter((task) => task.status === "done").length;
  const openCount = tasks.filter((task) => task.status !== "done").length;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return (
    <header className="header">
      <p className="brand">TaskBoard</p>
      <p>
        {doneCount} of {tasks.length} done
      </p>
    </header>
  );
}

export default Header;
