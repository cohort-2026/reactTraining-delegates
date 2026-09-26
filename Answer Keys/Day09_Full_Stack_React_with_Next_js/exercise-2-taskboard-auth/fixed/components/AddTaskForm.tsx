"use client";
import { useActionState } from "react";
import { addTask } from "@/app/actions";

export function AddTaskForm() {
  const [state, formAction, isPending] =
    useActionState(addTask, { error: null });
  return (
    <form action={formAction} className="row">
      <input name="title" aria-label="Title" required minLength={3} />
      <input type="hidden" name="status" value="todo" />
      <input type="hidden" name="points" value="1" />
      <button disabled={isPending}>Add</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
