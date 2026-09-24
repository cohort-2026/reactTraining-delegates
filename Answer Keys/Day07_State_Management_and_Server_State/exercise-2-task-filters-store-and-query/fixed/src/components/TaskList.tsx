import { useTasks } from "../hooks/useTasks";

const statusLabels = { todo: "To do", doing: "In progress", done: "Done" };

export function TaskList() {
  const { data: tasks = [], isPending, isError, error } = useTasks();

  if (isPending) return <p>Loading tasks...</p>;
  if (isError) return <p role="alert">{error.message}</p>;
  if (tasks.length === 0) return <p>No tasks to show.</p>;

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((t) => (
        <li key={t.id} className="card">
          <span>{t.title}</span>
          <span className="status">{statusLabels[t.status]}</span>
        </li>
      ))}
    </ul>
  );
}
