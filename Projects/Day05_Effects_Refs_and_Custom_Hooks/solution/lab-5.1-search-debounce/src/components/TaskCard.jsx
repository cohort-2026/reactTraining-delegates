import { useState } from "react";

function TaskCard({ task, onStatusChange, onRename, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function handleSave() {
    const title = draft.trim();
    if (title.length === 0) return;
    onRename(task.id, title);
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm(`Delete "${task.title}"?`)) onDelete(task.id);
  }

  return (
    <article className="card">
      {isEditing ? (
        <div className="edit-task">
          <label htmlFor={`task-title-${task.id}`}>Task title</label>
          <input
            id={`task-title-${task.id}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span className="points">{task.points} pts</span>}
      <div className="task-controls">
        <label htmlFor={`task-status-${task.id}`}>Status</label>
        <select
          id={`task-status-${task.id}`}
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
        >
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </article>
  );
}
export default TaskCard;
