import Column from "./Column";
import type { Status } from "../types";

type BoardProps = {
  projectId?: string;
};

const columns: [Status, string][] = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

function Board({ projectId }: BoardProps) {
  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column key={status} status={status} heading={heading} projectId={projectId} />
      ))}
    </div>
  );
}

export default Board;
