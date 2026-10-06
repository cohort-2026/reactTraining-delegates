import { useQuery } from "@tanstack/react-query";
import Column from "./Column";
import { fetchTasks } from "../api/tasks";

type BoardProps = {
  projectId: string;
};

const columns = [
  ["todo", "To do"],
  ["doing", "In progress"],
  ["done", "Done"],
] as const;

function Board({ projectId }: BoardProps) {
  const { isPending, isError, error } =
    useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  if (isPending) return <p>Loading tasks...</p>;
  if (isError) return <p role="alert">{error.message}</p>;

  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          heading={heading}
          status={status}
          projectId={projectId}
        />
      ))}
    </div>
  );
}

export default Board;
