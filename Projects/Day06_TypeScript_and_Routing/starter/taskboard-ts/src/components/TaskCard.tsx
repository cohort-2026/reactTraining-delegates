import { useState } from "react";
import type { Task, Status } from "../types";

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: Task["id"], status: Status) => void;
  onRename: (id: Task["id"], title: string) => void;
  onDelete: (id: Task["id"]) => void;
};

function TaskCard({ task, onStatusChange, onRename, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function handleSave() {
    const title = draft.trim();

    if (title.length < 3) {
      return;
    }

    onRename(task.id, title);
    setIsEditing(false);
  }

  return (
    <article className="task-card">
      {isEditing ? (
        <>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(task.title);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>

          {task.assignee && <p>Assignee: {task.assignee}</p>}

          <p>{task.points} points</p>

          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
          >
            <option value="todo">To do</option>
            <option value="doing">In progress</option>
            <option value="done">Done</option>
          </select>

          <div>
            <button type="button" onClick={() => setIsEditing(true)}>
              Rename
            </button>

            <button type="button" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default TaskCard;
