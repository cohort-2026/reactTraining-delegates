import { useState } from "react";
import type { ChangeEvent } from "react";
import { useDeleteTask, useMoveTask, useRenameTask } from "../hooks/useTasks";
import type { Status, Task } from "../types";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const move = useMoveTask();
  const rename = useRenameTask();
  const remove = useDeleteTask();
  const isPending = move.isPending || rename.isPending || remove.isPending;

  function handleSave() {
    const title = draft.trim();
    if (title.length < 3) return;
    rename.mutate(
      { id: task.id, title },
      { onSuccess: () => setIsEditing(false) }
    );
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      remove.mutate(task.id);
    }
  }

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    move.mutate({ id: task.id, status: e.target.value as Status });
  }

  return (
    <article className="card">
      {isEditing ? (
        <>
          <input aria-label="Task title" value={draft}
            onChange={(e) => setDraft(e.target.value)} disabled={isPending} />
          <button type="button" onClick={handleSave} disabled={isPending}>Save</button>
          <button type="button" onClick={() => {
            setDraft(task.title);
            setIsEditing(false);
          }} disabled={isPending}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button type="button" onClick={() => {
            setDraft(task.title);
            setIsEditing(true);
          }} disabled={isPending}>Edit</button>
        </>
      )}

      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span>{task.points} pts</span>}

      <select aria-label="Status" value={task.status} onChange={handleStatusChange} disabled={isPending}>
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>

      <button type="button" onClick={handleDeleteClick} disabled={isPending}>Delete</button>
      {rename.isError && <p role="alert">Could not rename task: {rename.error.message}</p>}
      {move.isError && <p role="alert">Could not move task: {move.error.message}</p>}
      {remove.isError && <p role="alert">Could not delete task: {remove.error.message}</p>}
    </article>
  );
}

export default TaskCard;
