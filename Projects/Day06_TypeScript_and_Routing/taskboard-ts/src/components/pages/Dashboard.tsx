import { useOutletContext, useSearchParams } from "react-router";
import AddTaskForm from "../AddTaskForm.tsx";
import Board from "../Board.tsx";
import type { Task, Status } from "../../types";

type OutletContext = {
  tasks: Task[];
  onAdd: (task: { title: string; assignee: string; points: number }) => void;
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
  seeding: boolean;
  seedError: string;
};

function Dashboard() {
  const {
    tasks,
    onAdd,
    onStatusChange,
    onRename,
    onDelete,
    onReset,
    seeding,
    seedError,
  } = useOutletContext<OutletContext>();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    if (next.trim() === "") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ q: next }, { replace: true });
    }
  }

  const visibleTasks = query.trim()
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.assignee.toLowerCase().includes(query.toLowerCase())
      )
    : tasks;

  const openCount = tasks.filter((t) => t.status !== "done").length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Dashboard
          </p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {openCount} open task{openCount === 1 ? "" : "s"}
          </h2>
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={seeding}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          {seeding ? "Seeding…" : "Reset board"}
        </button>
      </div>

      {seedError && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {seedError}
        </p>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search tasks…"
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/20"
        />
        {query.trim() && (
          <p className="mt-2 text-xs text-gray-500">
            Filtering by:{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">
              {query.trim()}
            </code>
          </p>
        )}
      </div>

      <AddTaskForm onAdd={onAdd} />

      <div className="mt-6">
        <Board
          tasks={visibleTasks}
          onStatusChange={onStatusChange}
          onRename={onRename}
          onDelete={onDelete}
        />
      </div>
    </main>
  );
}

export default Dashboard;