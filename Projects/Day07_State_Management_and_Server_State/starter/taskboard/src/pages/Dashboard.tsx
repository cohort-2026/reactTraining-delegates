import { useQuery } from "@tanstack/react-query";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";

export default function Dashboard() {
  const search = useFilterStore((state) => state.search);
  const setSearch = useFilterStore((state) => state.setSearch);
  const assignee = useFilterStore((state) => state.assignee);
  const setAssignee = useFilterStore((state) => state.setAssignee);

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const assignees = Array.from(
    new Set(
      tasks
        .map((task) => task.assignee)
        .filter((assignee): assignee is string => Boolean(assignee)),
    ),
  );

  return (
    <section>
      <h1>Dashboard</h1>

      <div className="search">
        <label htmlFor="search">Search tasks</label>

        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <label htmlFor="assignee">Assignee</label>

      <select
        id="assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      >
        <option value="">All assignees</option>

        {assignees.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <p className="hint">
        New tasks added here go into the {projects[0].name} project.
      </p>

      <ProjectBoard projectId={projects[0].id} />
    </section>
  );
}
