// TODO (Lab 6.1 steps 4 and 6): add a TaskCardProps type and type the status change handler
// (e.target.value as Status).
import { useState } from "react";
import type { Task, Status } from "../types";

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function TaskCard({ task, onStatusChange, onRename, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(task.title);

  function handleSave() {
    const title = draft.trim();
    if (title === "") return;
    onRename(task.id, title);
    setIsEditing(false);
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <article className="card">
      {isEditing ? (
        <>
          <input aria-label="Task title" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points && task.points > 0 && <span>{task.points} pts</span>}

      <select aria-label="Status" value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value as Status)}>
        <option value="To do">To do</option>
        <option value="In progress">In progress</option>
        <option value="Done">Done</option>
      </select>

      <button onClick={handleDeleteClick}>Delete</button>
    </article>
  );
}

export default TaskCard;