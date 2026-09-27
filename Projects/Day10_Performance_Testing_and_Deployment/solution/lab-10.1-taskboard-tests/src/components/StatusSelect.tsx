"use client";

import { useTransition } from "react";
import { moveTask } from "@/app/actions";
import type { Status } from "@/lib/types";

export function StatusSelect({ id, status }: { id: string; status: Status }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Status;
    startTransition(() => {
      moveTask(id, next);
    });
  }

  return (
    <select aria-label="Status" value={status} onChange={handleChange}
      disabled={isPending}
      className="h-7 rounded-md border border-input bg-background px-2 text-sm dark:bg-input/30">
      <option value="todo">To do</option>
      <option value="doing">In progress</option>
      <option value="done">Done</option>
    </select>
  );
}
