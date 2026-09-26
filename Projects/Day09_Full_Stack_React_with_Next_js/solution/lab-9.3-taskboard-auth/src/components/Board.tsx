import type { Status, Task } from "@/lib/types";
import { TaskCard } from "./TaskCard";

const columns: { status: Status; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "doing", label: "In progress" },
  { status: "done", label: "Done" },
];

export function Board({ tasks, q = "" }: { tasks: Task[]; q?: string }) {
  const visible = tasks.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()));

  return (
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
  );
}
