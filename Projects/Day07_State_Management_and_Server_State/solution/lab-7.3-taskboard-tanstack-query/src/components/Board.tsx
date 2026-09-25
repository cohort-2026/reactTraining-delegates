import { useQuery } from "@tanstack/react-query";
import Column from "./Column";
import { fetchTasks } from "../api/tasks";
import type { Status } from "../types";

type BoardProps = {
  projectId?: string;
};

const columns: [Status, string][] = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

function Board({ projectId }: BoardProps) {
  const { isPending, isError, error } =
    useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  if (isPending) return <p>Loading tasks...</p>;
  if (isError) return <p role="alert">{error.message}</p>;

  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column key={status} status={status} heading={heading} projectId={projectId} />
      ))}
    </div>
  );
}

export default Board;
