import { useSearchParams } from "react-router";
import AssigneeFilter from "../components/AssigneeFilter";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import { useTasks } from "../hooks/useTasks";
import { useFilterStore } from "../stores/filterStore";

export default function Dashboard() {
  const tasksQuery = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();
  const assignee = useFilterStore((state) => state.assignee);
  const q = searchParams.get("q") ?? "";

  const visible = (tasksQuery.data ?? []).filter((task) =>
    task.title.toLowerCase().includes(q.toLowerCase()) &&
    (!assignee || task.assignee === assignee)
  );

  function handleSearch(value: string) {
    setSearchParams(value ? { q: value } : {});
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <div className="search">
        <label htmlFor="search">Search tasks</label>
        <input id="search" type="search" value={q}
          onChange={(e) => handleSearch(e.target.value)} />
        <AssigneeFilter />
      </div>
      <p className="hint">New tasks added here go into the {projects[0].name} project.</p>
      {tasksQuery.isPending ? (
        <p>Loading tasks...</p>
      ) : tasksQuery.isError ? (
        <p role="alert">
          Could not load tasks: {tasksQuery.error.message}{" "}
          <button type="button" onClick={() => void tasksQuery.refetch()}>Retry</button>
        </p>
      ) : (
        <ProjectBoard tasks={visible} projectId={projects[0].id} />
      )}
    </section>
  );
}
