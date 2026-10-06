// TODO (Lab 7.2 step 6): select moveTask, renameTask and deleteTask from the store instead of props.
// TODO (Lab 7.3 steps 6-7): use the useMoveTask and useDeleteTask mutations, and disable controls while they are pending.
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Status, Task } from "../types";

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

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(task.id, e.target.value as Status);
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
