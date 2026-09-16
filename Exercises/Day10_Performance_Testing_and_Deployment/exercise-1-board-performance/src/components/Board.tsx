import { useCallback, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { TaskCard } from "./TaskCard";
import type { Status, Task } from "../types";

type Filter = "all" | Status;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "To do" },
  { value: "doing", label: "In progress" },
  { value: "done", label: "Done" },
];

export function Board({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");
  const [draft, setDraft] = useState("");

  const visible = useMemo(
    () => tasks.filter((t) => filter === "all" || t.status === filter),
    [tasks]);

  const handleMove = useCallback((id: string, status: Status) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = draft.trim();
    if (title.length < 3) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, status: "todo", points: 1 },
    ]);
    setDraft("");
  }

  return (
    <main>
      <h1>TaskBoard</h1>
      <form className="toolbar" onSubmit={handleAdd}>
        <input
          aria-label="New task title"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button>Add</button>
      </form>
      <div className="toolbar" role="group" aria-label="Filter tasks">
        {filters.map((f) => (
          <button key={f.value} type="button" aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>
      {visible.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          statusLabels={{ todo: "To do", doing: "In progress", done: "Done" }}
          onMove={handleMove}
        />
      ))}
    </main>
  );
}
