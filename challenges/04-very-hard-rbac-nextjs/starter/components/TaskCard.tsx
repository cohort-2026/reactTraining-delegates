"use client";
import { useActionState, useState } from "react";
import { deleteTask, moveTask, updateTask } from "@/app/board/actions";
import { initialState } from "@/lib/action-state";
import { STATUS_LABELS, TASK_STATUSES, type Task } from "@/lib/types";

type Props = {
  task: Task;
  authorName: string;
  /** Decided on the server with can(). Hiding a button is a courtesy, not security. */
  allowed: { update: boolean; move: boolean; delete: boolean };
};

export function TaskCard({ task, authorName, allowed }: Props) {
  const [editing, setEditing] = useState(false);
  const [updateState, updateAction, updating] = useActionState(
    async (prev: typeof initialState, formData: FormData) => {
      const result = await updateTask(prev, formData);
      if (!result.error) setEditing(false);
      return result;
    },
    initialState,
  );
  const [moveState, moveAction, moving] = useActionState(moveTask, initialState);
  const [deleteState, deleteAction, deleting] = useActionState(deleteTask, initialState);
  const error = updateState.error ?? moveState.error ?? deleteState.error;

  return (
    <article className="card task">
      {editing ? (
        <form action={updateAction} className="row">
          <input type="hidden" name="id" value={task.id} />
          <label htmlFor={`title-${task.id}`} className="visually-hidden">Title</label>
          <input id={`title-${task.id}`} name="title" defaultValue={task.title} required />
          <button disabled={updating}>Save</button>
          <button type="button" className="secondary" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <h3>{task.title}</h3>
      )}
      <p className="meta">Created by {authorName}</p>

      <div className="row actions">
        {allowed.move && (
          <form action={moveAction} className="row">
            <input type="hidden" name="id" value={task.id} />
            {TASK_STATUSES.filter((s) => s !== task.status).map((status) => (
              <button key={status} name="status" value={status} className="secondary" disabled={moving}>
                → {STATUS_LABELS[status]}
              </button>
            ))}
          </form>
        )}
        {allowed.update && !editing && (
          <button className="secondary" onClick={() => setEditing(true)}>Edit</button>
        )}
        {allowed.delete && (
          <form action={deleteAction}>
            <input type="hidden" name="id" value={task.id} />
            <button className="danger" disabled={deleting}>Delete</button>
          </form>
        )}
      </div>
      {error && <p role="alert" className="error">{error}</p>}
    </article>
  );
}
