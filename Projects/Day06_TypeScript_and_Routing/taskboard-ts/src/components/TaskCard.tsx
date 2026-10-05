import type { Task, Status } from "../types.ts";
import { useState } from "react";


type TaskCardProps = {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function TaskCard({ task, onStatusChange, onRename, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

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
    <article className="task-card">
      {isEditing ? (
        <>
          <input
            aria-label="Task title"
            value={draft}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDraft(e.target.value)
            }
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span className="task-card__points">{task.points} pts</span>}

      <div className="task-card__controls">
        <select
          aria-label="Status"
          value={task.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onStatusChange(task.id, e.target.value as Status)
          }
        >
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </article>
  );
}

export default TaskCard;