// Lab 4.3: TaskCard supports local title editing and reports task actions upward.
import { useState } from "react";

function TaskCard({ task, onStatusChange, onRename, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function handleStartEditing() {
    setDraft(task.title);
    setIsEditing(true);
  }

  function handleSave() {
    const title = draft.trim();
    if (title.length < 3) return;
    onRename(task.id, title);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(task.title);
    setIsEditing(false);
  }

  function handleEditKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    }
    if (event.key === "Escape") handleCancel();
  }

  function handleDelete() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <article className="card">
      {isEditing ? (
        <div className="task-edit">
          <label htmlFor={`task-title-${task.id}`}>Task title</label>
          <input
            id={`task-title-${task.id}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleEditKeyDown}
            autoFocus
          />
          <div className="task-actions">
            <button type="button" onClick={handleSave} disabled={draft.trim().length < 3}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button type="button" onClick={handleStartEditing}>Edit</button>
        </>
      )}
      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span className="points">{task.points} pts</span>}
      <label className="task-status-label" htmlFor={`task-status-${task.id}`}>
        Status
      </label>
      <select
        id={`task-status-${task.id}`}
        value={task.status}
        onChange={(event) => onStatusChange(task.id, event.target.value)}
      >
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>
      <button className="task-delete" type="button" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
}
export default TaskCard;
