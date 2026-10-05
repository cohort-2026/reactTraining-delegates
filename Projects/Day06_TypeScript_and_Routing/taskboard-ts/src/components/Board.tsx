import Column from "./Column";
import type { Task, Status } from "../types";

const columns: [Status, string][] = [
  ["todo", "To do"],
  ["doing", "In progress"],
  ["done", "Done"],
];

type BoardProps = {
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function Board({ tasks, onStatusChange, onRename, onDelete }: BoardProps) {
  return (
    <div className="kanban-board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          status={status}
          heading={heading}
          tasks={tasks.filter((t) => t.status === status)}
          onStatusChange={onStatusChange}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Board;