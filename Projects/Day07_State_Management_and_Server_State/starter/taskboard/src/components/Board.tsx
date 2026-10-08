import Column from "./Column";
import type { Status, Task } from "../types";

type BoardProps = {
  tasks: Task[];
};

const columns: [Status, string][] = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

function Board({ tasks }: BoardProps) {
  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          heading={heading}
          tasks={tasks.filter((t) => t.status === status)}
        />
      ))}
    </div>
  );
}

export default Board;
