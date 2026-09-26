import Link from "next/link";
import { getTasks, projects } from "@/lib/data";
import { FilterBar } from "@/components/FilterBar";
import { Board } from "@/components/Board";

// Next.js 16 passes searchParams as a Promise, so it must be awaited
// before its values can be read.
type PageProps = {
  searchParams: Promise<{ q?: string; assignee?: string }>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const { q, assignee } = await searchParams;
  const tasks = await getTasks();
  const assignees = [...new Set(tasks.flatMap((t) => (t.assignee ? [t.assignee] : [])))];

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">All tasks across every project.</p>
      </div>

      <nav className="flex flex-wrap gap-2">
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`}
            className="rounded-md border px-3 py-1 text-sm hover:bg-accent">
            {p.name}
          </Link>
        ))}
      </nav>

      <FilterBar assignees={assignees} />
      <Board tasks={tasks} q={q} assignee={assignee} />
    </section>
  );
}
