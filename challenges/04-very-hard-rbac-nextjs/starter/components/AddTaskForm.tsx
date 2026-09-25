"use client";
import { useActionState } from "react";
import { createTask } from "@/app/board/actions";
import { initialState } from "@/lib/action-state";
import { STATUS_LABELS, TASK_STATUSES } from "@/lib/types";

export function AddTaskForm() {
  const [state, formAction, isPending] = useActionState(createTask, initialState);

  return (
    <form action={formAction} className="row card">
      <label htmlFor="new-title" className="visually-hidden">Task title</label>
      <input id="new-title" name="title" placeholder="New task title" required />
      <label htmlFor="new-status" className="visually-hidden">Status</label>
      <select id="new-status" name="status" defaultValue="todo">
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>{STATUS_LABELS[status]}</option>
        ))}
      </select>
      <button disabled={isPending}>Add task</button>
      {state.error && <p role="alert" className="error">{state.error}</p>}
    </form>
  );
}
