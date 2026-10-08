import { Link, useParams } from "react-router";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import { useTasks } from "../hooks/useTasks";

export default function Project() {
  const { projectId } = useParams();
  const tasksQuery = useTasks();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <Link to="/">Back to dashboard</Link>
      </section>
    );
  }

  if (tasksQuery.isPending) {
    return <p>Loading tasks...</p>;
  }

  if (tasksQuery.isError) {
    return (
      <p role="alert">
        Could not load tasks: {tasksQuery.error.message}{" "}
        <button type="button" onClick={() => void tasksQuery.refetch()}>Retry</button>
      </p>
    );
  }

  const projectTasks = tasksQuery.data.filter((task) => task.projectId === projectId);
  return (
    <section>
      <h1>{project.name}</h1>
      <p>{projectTasks.length} tasks</p>
      <ProjectBoard tasks={projectTasks} projectId={project.id} />
    </section>
  );
}
