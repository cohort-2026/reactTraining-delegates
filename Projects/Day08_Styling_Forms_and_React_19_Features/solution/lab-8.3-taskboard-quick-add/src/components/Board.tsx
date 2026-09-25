import { useOptimistic } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { fetchTasks } from "@/api/tasks";
import { useFilterStore } from "@/state/useFilterStore";
import type { Status, Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { QuickAddForm } from "./QuickAddForm";

type BoardProps = {
  projectId: string;
};

const columns: { status: Status; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "doing", label: "In progress" },
  { status: "done", label: "Done" },
];

function Board({ projectId }: BoardProps) {
  const { data: tasks = [], isPending, isError, error } =
    useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const assignee = useFilterStore((s) => s.assignee);
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").toLowerCase();

  const [optimisticTasks, addOptimistic] = useOptimistic(
    tasks,
    (current: Task[], newTask: Task) =>
      current.some((t) => t.clientId === newTask.clientId)
        ? current                // the real task has arrived
        : [...current, newTask],
  );

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-busy="true">
        <p className="sr-only">Loading tasks...</p>
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }
  if (isError) return <p role="alert" className="text-red-700 dark:text-red-400">{error.message}</p>;

  const visible = optimisticTasks.filter((t) =>
    t.projectId === projectId &&
    (!assignee || t.assignee === assignee) &&
    t.title.toLowerCase().includes(q)
  );

  return (
    <div className="grid gap-6">
      <QuickAddForm projectId={projectId} onOptimisticAdd={addOptimistic} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((c) => {
          const columnTasks = visible.filter((t) => t.status === c.status);
          return (
            <section key={c.status}
              className="rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
              <h2 className="mb-3 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">
                {c.label} ({columnTasks.length})
              </h2>
              {columnTasks.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">Nothing here yet</p>
              ) : (
                <ul className="grid gap-3">
                  {columnTasks.map((t) => (
                    <li key={t.id}><TaskCard task={t} /></li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
