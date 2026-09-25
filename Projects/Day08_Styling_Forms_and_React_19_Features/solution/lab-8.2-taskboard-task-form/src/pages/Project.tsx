import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Board from "@/components/Board";
import FilterBar from "@/components/FilterBar";
import { NewTaskDialog } from "@/components/NewTaskDialog";
import { fetchTasks } from "@/api/tasks";
import { projects } from "@/data/projects";

export default function Project() {
  const { projectId } = useParams();
  const { data: tasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Project not found</h1>
        <Link to="/" className="text-sm font-medium underline underline-offset-4">Back to dashboard</Link>
      </section>
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  return (
    <section className="grid gap-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{projectTasks.length} tasks</p>
        </div>
        <NewTaskDialog projectId={project.id} />
      </div>
      <FilterBar />
      <Board projectId={project.id} />
    </section>
  );
}
