import { memo } from "react";
import { formatPoints } from "../format";
import type { Status, Task } from "../types";

type TaskCardProps = {
  task: Task;
  statusLabels: Record<Status, string>;
  onMove: (id: string, status: Status) => void;
};

export const TaskCard = memo(function TaskCard(
  { task, statusLabels, onMove }: TaskCardProps) {
  return (
    <article className="card">
      <h3>{task.title}</h3>
      <p>{formatPoints(task.points)}</p>
      <select
        aria-label={`Status of ${task.title}`}
        value={task.status}
        onChange={(e) => onMove(task.id, e.target.value as Status)}
      >
        <option value="todo">{statusLabels.todo}</option>
        <option value="doing">{statusLabels.doing}</option>
        <option value="done">{statusLabels.done}</option>
      </select>
    </article>
  );
});
