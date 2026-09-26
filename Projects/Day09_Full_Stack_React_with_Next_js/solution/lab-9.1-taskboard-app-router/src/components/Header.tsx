import Link from "next/link";
import { getTasks } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";

// An async Server Component: it fetches its own data on the server,
// with no loading state or effect needed.
export async function Header() {
  const tasks = await getTasks();
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TaskBoard
          </Link>
          <p className="text-sm text-muted-foreground">
            {doneCount} of {tasks.length} done
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/settings" className="text-muted-foreground hover:text-foreground">
            Settings
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
