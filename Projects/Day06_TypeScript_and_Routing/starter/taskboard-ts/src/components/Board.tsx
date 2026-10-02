import type { Task, Status } from "../types";
import Column from "./Column";

type BoardProps = {
  tasks: Task[];
  onStatusChange: (id: Task["id"], status: Status) => void;
  onRename: (id: Task["id"], title: string) => void;
  onDelete: (id: Task["id"]) => void;
};

const statuses: { key: Status; heading: string }[] = [
  { key: "todo", heading: "To do" },
  { key: "doing", heading: "In progress" },
  { key: "done", heading: "Done" },
];

function Board({ tasks, onStatusChange, onRename, onDelete }: BoardProps) {
  return (
    <div className="board">
      {statuses.map(({ key: status, heading }) => (
        <Column
          key={status}
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
