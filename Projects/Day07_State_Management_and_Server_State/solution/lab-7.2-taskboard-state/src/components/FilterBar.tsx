import { useSearchParams } from "react-router";
import { useFilterStore } from "../state/useFilterStore";
import { useTaskStore } from "../state/useTaskStore";

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const tasks = useTaskStore((s) => s.tasks);
  const assignee = useFilterStore((s) => s.assignee);
  const setAssignee = useFilterStore((s) => s.setAssignee);

  // Derived from the selected array, outside the selector
  const assignees = [...new Set(tasks.flatMap((t) => (t.assignee ? [t.assignee] : [])))];

  function handleSearch(value: string) {
    setSearchParams(value ? { q: value } : {});
  }

  return (
    <div className="search">
      <label htmlFor="search">Search tasks</label>
      <input id="search" type="search" value={q}
        onChange={(e) => handleSearch(e.target.value)} />

      <label htmlFor="assignee-filter">Assignee</label>
      <select id="assignee-filter" value={assignee}
        onChange={(e) => setAssignee(e.target.value)}>
        <option value="">Everyone</option>
        {assignees.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </div>
  );
}
