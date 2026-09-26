import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { AddTaskForm } from "@/components/AddTaskForm";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Dashboard() {
  const supabase = await createClient();
  const user = await getCurrentUser(supabase);
  if (!user) redirect("/login");

  const { data: tasks } = await supabase
    .from("tasks").select("id, title, status, points").order("created_at");

  return (
    <section className="stack">
      <div className="row">
        <p>Signed in as {user.email}</p>
        <SignOutButton />
      </div>
      <h1>My tasks</h1>
      <AddTaskForm />
      <ul>
        {(tasks ?? []).map((task) => (
          <li key={task.id}>
            {task.title} (status: {task.status}, points: {task.points})
          </li>
        ))}
      </ul>
    </section>
  );
}
