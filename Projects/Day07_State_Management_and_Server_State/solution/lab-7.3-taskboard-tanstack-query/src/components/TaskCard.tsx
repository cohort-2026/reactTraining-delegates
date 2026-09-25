import { useState } from "react";
import type { ChangeEvent } from "react";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useMoveTask } from "../hooks/useMoveTask";
import { useRenameTask } from "../hooks/useRenameTask";
import type { Status, Task } from "../types";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const moveTask = useMoveTask();
  const renameTask = useRenameTask();
  const deleteTask = useDeleteTask();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const failed = moveTask.isError || renameTask.isError || deleteTask.isError;

  function handleSave() {
    const title = draft.trim();
    if (title === "") return;
    renameTask.mutate({ id: task.id, title }, {
      onSuccess: () => setIsEditing(false),
    });
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask.mutate(task.id);
    }
  }

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    moveTask.mutate({ id: task.id, status: e.target.value as Status });
  }

  return (
    <article className="card">
      {isEditing ? (
        <>
          <input aria-label="Task title" value={draft}
            onChange={(e) => setDraft(e.target.value)} />
          <button onClick={handleSave} disabled={renameTask.isPending}>
            {renameTask.isPending ? "Saving..." : "Save"}
          </button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span>{task.points} pts</span>}

      <select aria-label="Status" value={task.status} onChange={handleStatusChange}
        disabled={moveTask.isPending}>
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>

      <button onClick={handleDeleteClick} disabled={deleteTask.isPending}>
        {deleteTask.isPending ? "Deleting..." : "Delete"}
      </button>

      {failed && <p role="alert">Could not save the change. Is json-server running?</p>}
    </article>
  );
}

export default TaskCard;
