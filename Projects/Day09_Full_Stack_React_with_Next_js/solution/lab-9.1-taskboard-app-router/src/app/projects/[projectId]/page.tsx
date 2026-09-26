import { notFound } from "next/navigation";
import { getProject, getTasks } from "@/lib/data";
import { FilterBar } from "@/components/FilterBar";
import { Board } from "@/components/Board";

// Dynamic route params are also a Promise in Next.js 16.
type PageProps = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ q?: string; assignee?: string }>;
};

export default async function ProjectPage({ params, searchParams }: PageProps) {
  const { projectId } = await params;
  const { q, assignee } = await searchParams;
  const project = await getProject(projectId);

  // Renders the nearest not-found.tsx instead of a blank or broken page.
  if (!project) notFound();

  const allTasks = await getTasks();
  const tasks = allTasks.filter((t) => t.projectId === projectId);
  const assignees = [...new Set(tasks.flatMap((t) => (t.assignee ? [t.assignee] : [])))];

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-sm text-muted-foreground">{tasks.length} tasks</p>
      </div>
      <FilterBar assignees={assignees} />
      <Board tasks={tasks} q={q} assignee={assignee} />
    </section>
  );
}
