import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";

export default function Settings() {
  const { refetch, isFetching, isError, error } =
    useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  return (
    <section>
      <h1>Settings</h1>
      <p>Tasks are saved by the TaskBoard API and shared across projects.</p>
      <button className="reset-button" onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refresh tasks"}
      </button>
      {isError && <p role="alert">{error.message}</p>}
    </section>
  );
}
