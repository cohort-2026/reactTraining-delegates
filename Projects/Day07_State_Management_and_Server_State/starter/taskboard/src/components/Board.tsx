import Column from "./Column";
import type { Status } from "../types";

type BoardProps = {
  projectId?: string;
  filtered?: boolean;
};

const columns: [Status, string][] = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

function Board({ projectId, filtered = false }: BoardProps) {
  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          heading={heading}
          status={status}
          projectId={projectId}
          filtered={filtered}
        />
      ))}
    </div>
  );
}

export default Board;
