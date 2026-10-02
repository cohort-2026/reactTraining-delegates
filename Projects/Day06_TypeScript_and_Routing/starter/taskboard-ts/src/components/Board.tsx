// TODO (Lab 6.1 step 4): add a BoardProps type.
import Column from "./Column";
import type { Task, Status } from "../types";

const columns: Status[] = ["To do", "In progress", "Done"];

type BoardProps = {
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function Board({ tasks, onStatusChange, onRename, onDelete }: BoardProps) {
  return (
    <div className="board">
      {columns.map((status) => (
        <Column
          key={status}
          heading={status}
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
