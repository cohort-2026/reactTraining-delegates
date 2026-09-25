import { useOptimistic, useState } from "react";
import { initialTasks, setOffline } from "./api/tasks";
import type { Task } from "./types";
import { QuickAddForm } from "./components/QuickAddForm";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [optimistic, addOptimistic] = useOptimistic(
    tasks,
    (current: Task[], newTask: Task) =>
      current.some((t) => t.clientId === newTask.clientId)
        ? current // the real task has arrived
        : [...current, newTask],
  );

  return (
    <main className="mx-auto grid max-w-lg gap-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold">TaskBoard quick add</h1>

      <QuickAddForm
        onOptimisticAdd={addOptimistic}
        onSaved={(saved) => setTasks((current) => [...current, saved])}
      />

      <ul aria-label="Tasks" className="grid gap-2">
        {optimistic.map((t) => (
          <li
            key={t.id}
            aria-busy={t.pending || undefined}
            className={`rounded-lg bg-slate-100 p-3 ${t.pending ? "opacity-50" : ""}`}
          >
            {t.title}
            {t.pending && <span className="text-sm"> (saving...)</span>}
          </li>
        ))}
      </ul>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" onChange={(e) => setOffline(e.target.checked)} />
        Simulate the server being offline
      </label>
    </main>
  );
}
