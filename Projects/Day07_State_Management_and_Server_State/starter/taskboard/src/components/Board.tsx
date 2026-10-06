import { useQuery } from "@tanstack/react-query";
import Column from "./Column";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";
import type { Status } from "../types";

const columns: [Status, string][] = [
  ["todo", "To do"],
  ["doing", "In progress"],
  ["done", "Done"],
];

function Board() {
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const search = useFilterStore((state) => state.search);
  const assignee = useFilterStore((state) => state.assignee);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return <p>Failed to load tasks.</p>;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesAssignee = assignee === "" || task.assignee === assignee;

    return matchesSearch && matchesAssignee;
  });

  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          heading={heading}
          status={status}
          tasks={filteredTasks}
        />
      ))}
    </div>
  );
}

export default Board;
