import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import { fetchTasks } from "../api/tasks";
import { useEffect } from "react";
import { useTaskStore } from "../state/useTaskStore";

export default function Project() {
  const { projectId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const tasks = useTaskStore((state) => state.tasks);
  const loadTasks = useTaskStore((state) => state.loadTasks);
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (data) loadTasks(data);
  }, [data, loadTasks]);

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p role="alert">Could not load tasks. Is json-server running?</p>;

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
