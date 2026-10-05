// TODO (Lab 7.2 step 7): add an assignee filter from a filter store.
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import { useFilterStore } from "../state/useFilterStore";
import { useTaskStore } from "../state/useTaskStore";

export default function Dashboard() {
  const search = useFilterStore((state) => state.search);
  const setSearch = useFilterStore((state) => state.setSearch);

  const assignee = useFilterStore((state) => state.assignee);
  const setAssignee = useFilterStore((state) => state.setAssignee);

  const tasks = useTaskStore((state) => state.tasks);

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
        ))}{" "}
      </select>

      <p className="hint">
        New tasks added here go into the {projects[0].name} project.
      </p>

      <ProjectBoard projectId={projects[0].id} />
    </section>
  );
}
