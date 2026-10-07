import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";
import { useTaskStore } from "../state/useTaskStore";

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const tasks = useTaskStore((state) => state.tasks);
  const loadTasks = useTaskStore((state) => state.loadTasks);
  const searchText = useFilterStore((state) => state.searchText);
  const setSearchText = useFilterStore((state) => state.setSearchText);
  const assignee = useFilterStore((state) => state.assignee);
  const setAssignee = useFilterStore((state) => state.setAssignee);

  useEffect(() => {
    if (data) loadTasks(data);
  }, [data, loadTasks]);

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p role="alert">Could not load tasks. Is json-server running?</p>;

  return (
    <section>
      <h1>Dashboard</h1>
      <div className="search">
        <label htmlFor="search">Search tasks</label>
        <input id="search" type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />

        <label htmlFor="assignee-filter">Assignee</label>
        <select id="assignee-filter" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          <option value="">Everyone</option>
          {[...new Set(tasks.flatMap((task) => (task.assignee ? [task.assignee] : [])))].map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <p className="hint">New tasks added here go into the {projects[0].name} project.</p>
      <ProjectBoard filtered />
    </section>
  );
}
