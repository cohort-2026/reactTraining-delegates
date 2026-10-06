import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import { fetchTasks } from "../api/tasks";

export default function Project() {
  const { projectId } = useParams();

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <Link to="/">Back to dashboard</Link>
      </section>
    );
  }

  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  return (
    <section>
      <h1>{project.name}</h1>
      <p>{projectTasks.length} tasks</p>

      <ProjectBoard projectId={project.id} />
    </section>
  );
}
