"use client";

import { useActionState } from "react";
import { addTask } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddTaskForm() {
  const [state, formAction, isPending] = useActionState(addTask, { error: null });

  return (
    <form action={formAction} className="flex flex-wrap items-start gap-2">
      <label htmlFor="title" className="sr-only">Title</label>
      <Input id="title" name="title" placeholder="Add a task..." required minLength={3}
        className="max-w-sm"
        aria-invalid={!!state.error}
        aria-describedby={state.error ? "add-task-error" : undefined} />
      <input type="hidden" name="status" value="todo" />
      <input type="hidden" name="points" value="1" />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </Button>
      {state.error && (
        <p id="add-task-error" role="alert" className="w-full text-sm text-red-700 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
