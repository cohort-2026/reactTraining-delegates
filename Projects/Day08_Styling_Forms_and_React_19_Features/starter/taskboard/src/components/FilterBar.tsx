import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const { data: tasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const assignee = useFilterStore((s) => s.assignee);
  const setAssignee = useFilterStore((s) => s.setAssignee);

  // Derived from the query data on every render
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
