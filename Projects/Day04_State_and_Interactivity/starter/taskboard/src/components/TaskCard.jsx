import { useState } from "react";

// TODO (Lab 4.3 steps 3-6): receive { task, onStatusChange, onRename, onDelete }, and add a status
//   dropdown, Delete with confirm(), and inline Edit (isEditing and draft are local state here).

function TaskCard({ task, onStatusChange, onRename, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const handleSave = () => {
    const trimmedTitle = draft.trim();

    if (!trimmedTitle) return;

    onRename(task.id, trimmedTitle);
    setIsEditing(false);
  };

  if (!task?.title) return null;

  return (
    <article className="card">
      {isEditing ? (
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      ) : (
        <h3>{task.title}</h3>
      )}

      {task.assignee && <p>Assigned to {task.assignee}</p>}

      {task.points > 0 && <span className="points">{task.points} pts</span>}

      <select
        value={task.status}
        onChange={(event) => onStatusChange(task.id, event.target.value)}
      >
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>

      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </article>
  );
}

export default TaskCard;
