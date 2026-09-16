import { useFilterStore } from "../state/useFilterStore";
import type { StatusFilter } from "../api/tasks";

export function FilterBar() {
  const { status, setStatus } = useFilterStore((s) => ({
    status: s.status,
    setStatus: s.setStatus,
  }));

  return (
    <div className="filter-bar">
      <label htmlFor="status-filter">Show</label>
      <select
        id="status-filter"
        value={status}
        onChange={(e) => setStatus(e.target.value as StatusFilter)}
      >
        <option value="all">All tasks</option>
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
