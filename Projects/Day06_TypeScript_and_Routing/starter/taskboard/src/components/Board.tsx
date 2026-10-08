import type { Status, Task } from "../types";
import Column from "./Column.jsx";

const columns: { status: Status; heading: string }[] = [
  { status: "todo", heading: "To do" },
  { status: "doing", heading: "In progress" },
  { status: "done", heading: "Done" },
];

type BoardProps = {
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function Board({ tasks, onStatusChange, onRename, onDelete }: BoardProps) {
  return (
    <div className="board">
      {columns.map(({ status, heading }) => (
        <Column
          key={status}
          heading={heading}
          tasks={tasks.filter((task) => task.status === status)}
          onStatusChange={onStatusChange}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Board;
