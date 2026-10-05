// TODO (Lab 7.3 step 7): show loading and error states from useQuery.
import Column from "./Column";
import { useTaskStore } from "../state/useTaskStore";
import { useFilterStore } from "../state/useFilterStore";
import type { Status } from "../types";

const columns: [Status, string][] = [
  ["todo", "To do"],
  ["doing", "In progress"],
  ["done", "Done"],
];

function Board() {
  const tasks = useTaskStore((state) => state.tasks);

  const search = useFilterStore((state) => state.search);
  const assignee = useFilterStore((state) => state.assignee);

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
