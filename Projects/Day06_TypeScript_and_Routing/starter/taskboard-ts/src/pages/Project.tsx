import { useOutletContext, useParams, useSearchParams } from "react-router";
import type { BoardContext } from "./Layout";

function Project() {
  const { tasks } = useOutletContext<BoardContext>();
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const projectTasks = tasks.filter(
    (task) =>
      task.projectId === projectId &&
      task.title.toLowerCase().includes(search.toLowerCase()),
  );
  if (projectTasks.length === 0) {
    return (
      <main>
        <h2>Project not found</h2>
        <p>We couldn't find that project.</p>
      </main>
    );
  }

  return (
    <main>
      <h2>Project: {projectId}</h2>

      <input
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => {
          setSearchParams(e.target.value ? { search: e.target.value } : {});
        }}
      />

      <p>Tasks: {projectTasks.length}</p>

      {projectTasks.map((task) => (
        <article key={task.id}>
          <h3>{task.title}</h3>
          <p>Assignee: {task.assignee}</p>
          <p>Status: {task.status}</p>
          <p>{task.points} points</p>
        </article>
      ))}
    </main>
  );
}

export default Project;
