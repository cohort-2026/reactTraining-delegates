import { redirect } from "next/navigation";
import { AddTaskForm } from "@/components/AddTaskForm";
import { NavBar } from "@/components/NavBar";
import { TaskCard } from "@/components/TaskCard";
import { listTasks, listUsers } from "@/lib/db";
import { can } from "@/lib/permissions";
import { getSession } from "@/lib/session";
import { STATUS_LABELS, TASK_STATUSES } from "@/lib/types";

export default async function BoardPage() {
  // The proxy has already redirected signed-out visitors, but a page must
  // never rely on that: check again here.
  const user = await getSession();
  if (!user) redirect("/login");

  const tasks = listTasks();
  const names = new Map(listUsers().map((u) => [u.id, u.name]));

  return (
    <div className="stack">
      <NavBar user={user} />
      <h1>Board</h1>
      {can(user, "task:create") ? (
        <AddTaskForm />
      ) : (
        <p className="meta">You have read-only access.</p>
      )}
      <div className="columns">
        {TASK_STATUSES.map((status) => (
          <section key={status} className="stack">
            <h2>{STATUS_LABELS[status]}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => {
                const resource = { type: "task", ownerId: task.createdBy } as const;
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    authorName={names.get(task.createdBy) ?? "Unknown"}
                    allowed={{
                      update: can(user, "task:update", resource),
                      move: can(user, "task:move", resource),
                      delete: can(user, "task:delete", resource),
                    }}
                  />
                );
              })}
          </section>
        ))}
      </div>
    </div>
  );
}
