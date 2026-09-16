import { PointsStepper } from "@/components/PointsStepper";
import type { Task } from "@/lib/types";

export function TaskCard({ task }: { task: Task }) {
  return (
    <article className="card">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <PointsStepper initialPoints={task.points} />
    </article>
  );
}
