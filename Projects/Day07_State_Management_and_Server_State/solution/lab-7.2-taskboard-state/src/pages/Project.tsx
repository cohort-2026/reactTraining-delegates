import { Link, useParams } from "react-router";
import AddTaskForm from "../components/AddTaskForm";
import Board from "../components/Board";
import FilterBar from "../components/FilterBar";
import { projects } from "../data/projects";
import { useTaskStore } from "../state/useTaskStore";

export default function Project() {
  const { projectId } = useParams();
  const tasks = useTaskStore((s) => s.tasks);
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
      <FilterBar />
      <AddTaskForm projectId={project.id} />
      <Board projectId={project.id} />
    </section>
  );
}
