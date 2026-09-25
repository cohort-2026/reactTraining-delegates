import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/state/useFilterStore";

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
    <div className="flex flex-wrap items-end gap-4">
      <div className="grid gap-2">
        <Label htmlFor="search">Search tasks</Label>
        <Input id="search" type="search" value={q} className="w-64"
          onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="assignee-filter">Assignee</Label>
        <select id="assignee-filter" value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm dark:bg-input/30">
          <option value="">Everyone</option>
          {assignees.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
