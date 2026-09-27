import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AddTaskForm } from "@/components/AddTaskForm";
import { FilterBar } from "@/components/FilterBar";
import { Board } from "@/components/Board";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

// Real, server-side protection: this page asks Supabase who the user is
// before rendering anything. Compare this with Day 6's mock RequireAuth,
// which only hid pages in the browser.
export default async function DashboardPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  // RLS already restricts rows to the current user, so no user_id filter
  // is needed here.
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at");

  if (error) {
    // Lets the nearest error.tsx handle it, with a "Try again" button.
    throw new Error(error.message);
  }

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your tasks, stored in Supabase.</p>
      </div>
      <FilterBar />
      <AddTaskForm />
      <Board tasks={tasks ?? []} q={q} />
    </section>
  );
}
