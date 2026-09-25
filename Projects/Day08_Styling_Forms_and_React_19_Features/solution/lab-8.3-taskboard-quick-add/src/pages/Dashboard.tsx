import Board from "@/components/Board";
import FilterBar from "@/components/FilterBar";
import { NewTaskDialog } from "@/components/NewTaskDialog";
import { projects } from "@/data/projects";

export default function Dashboard() {
  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <FilterBar />
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          New tasks added here go into the {projects[0].name} project.
        </p>
        <NewTaskDialog projectId={projects[0].id} />
      </div>
      <Board projectId={projects[0].id} />
    </section>
  );
}
