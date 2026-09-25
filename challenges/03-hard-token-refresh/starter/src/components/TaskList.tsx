import { useTasks } from "../hooks/useTasks";

export function TaskList() {
  const { data: tasks = [], isPending, isError, error, refetch, isFetching } = useTasks();

  if (isPending) return <p>Loading tasks...</p>;

  return (
    <>
      <button type="button" onClick={() => refetch()} disabled={isFetching}>
        Reload
      </button>
      {isError && <p role="alert">Could not load tasks: {error.message}</p>}
      <ul className="task-list" aria-label="Tasks">
        {tasks.map((t) => (
          <li key={t.id} className="card">
            <span className={t.done ? "done" : undefined}>{t.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
