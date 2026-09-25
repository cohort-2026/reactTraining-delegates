import { useActionState } from "react";
import { taskSchema } from "../schemas/task";
import { createTask } from "../api/tasks";
import type { Task } from "../types";
import { SubmitButton } from "./SubmitButton";

type State = { error: string | null };

type Props = {
  onOptimisticAdd: (task: Task) => void;
  onSaved: (task: Task) => void;
};

export function QuickAddForm({ onOptimisticAdd, onSaved }: Props) {
  async function addTaskAction(_prev: State, formData: FormData): Promise<State> {
    const result = taskSchema.shape.title.safeParse(formData.get("title") ?? "");
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    const clientId = crypto.randomUUID();
    onOptimisticAdd({
      id: clientId, clientId, title: result.data, status: "todo", points: 1, pending: true,
    });

    try {
      const saved = await createTask({ clientId, title: result.data, status: "todo", points: 1 });
      onSaved(saved);
      return { error: null };
    } catch {
      return { error: "Could not save the task. Try again." };
    }
  }

  const [state, formAction] = useActionState(addTaskAction, { error: null });

  return (
    <form action={formAction} className="flex flex-wrap items-start gap-2">
      <label htmlFor="quick-title" className="sr-only">New task title</label>
      <input
        id="quick-title"
        name="title"
        placeholder="Add a task..."
        className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2"
        aria-invalid={!!state.error}
        aria-describedby={state.error ? "quick-error" : undefined}
      />
      <SubmitButton />
      {state.error && (
        <p id="quick-error" role="alert" className="w-full text-sm text-red-700">
          {state.error}
        </p>
      )}
    </form>
  );
}
