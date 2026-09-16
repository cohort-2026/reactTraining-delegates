import type { ChangeEvent } from "react";
import type { Status, Task } from "../types";

type TaskItemProps = {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
};

export default function TaskItem({ task, onStatusChange }: TaskItemProps) {
  const owner = task.assignee.split(" ")[0];

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(task.id, e.target.value as Status);
  }

  return (
    <article className={`task ${task.status}`}>
      <h2>{task.title}</h2>
      <p>Owner: {owner}</p>
      <select
        aria-label={`Status of ${task.title}`}
        value={task.status}
        onChange={handleChange}
      >
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>
    </article>
  );
}
