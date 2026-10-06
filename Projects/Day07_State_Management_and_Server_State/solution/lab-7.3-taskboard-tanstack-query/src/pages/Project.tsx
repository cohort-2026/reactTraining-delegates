// TODO (Lab 7.2 step 6): read tasks with a store selector instead of Outlet context.
// TODO (Lab 7.3 step 5): read tasks with useQuery instead.
import { Link, useOutletContext, useParams } from "react-router";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import type { BoardContext } from "./Layout";

export default function Project() {
  const { projectId } = useParams();
  const { tasks } = useOutletContext<BoardContext>();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <Link to="/">Back to dashboard</Link>
      </section>
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  return (
    <section>
      <h1>{project.name}</h1>
      <p>{projectTasks.length} tasks</p>
      <ProjectBoard tasks={projectTasks} projectId={project.id} />
    </section>
  );
}
