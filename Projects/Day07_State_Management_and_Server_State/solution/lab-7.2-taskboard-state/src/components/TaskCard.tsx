import { useState } from "react";
import type { ChangeEvent } from "react";
import { useTaskStore } from "../state/useTaskStore";
import type { Status, Task } from "../types";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const moveTask = useTaskStore((s) => s.moveTask);
  const renameTask = useTaskStore((s) => s.renameTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function handleSave() {
    const title = draft.trim();
    if (title === "") return;
    renameTask(task.id, title);
    setIsEditing(false);
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  }

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    moveTask(task.id, e.target.value as Status);
  }

  return (
    <article className="card">
      {isEditing ? (
        <>
          <input aria-label="Task title" value={draft}
            onChange={(e) => setDraft(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span>{task.points} pts</span>}

      <select aria-label="Status" value={task.status} onChange={handleStatusChange}>
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>

      <button onClick={handleDeleteClick}>Delete</button>
    </article>
  );
}

export default TaskCard;
