import { useTasks } from "../hooks/useTasks";
import { useFilterStore } from "../stores/filterStore";

export default function AssigneeFilter() {
  const { data: tasks = [] } = useTasks();
  const assignee = useFilterStore((s) => s.assignee);
  const setAssignee = useFilterStore((s) => s.setAssignee);

  // Derive the options here, outside any selector, so the selector keeps returning a stable value.
  const names = [...new Set(tasks.map((t) => t.assignee).filter((a): a is string => Boolean(a)))].sort();

  return (
    <div className="filter">
      <label htmlFor="assignee-filter">Assignee</label>
      <select id="assignee-filter" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
        <option value="">Everyone</option>
        {names.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </div>
  );
}