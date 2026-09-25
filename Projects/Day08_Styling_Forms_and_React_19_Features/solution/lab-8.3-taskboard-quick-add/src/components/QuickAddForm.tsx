import { useActionState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { taskSchema } from "@/schemas/task";
import { createTask } from "@/api/tasks";
import type { Task } from "@/types";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";

type State = { error: string | null };

type QuickAddFormProps = {
  projectId: string;
  onOptimisticAdd: (task: Task) => void;
};

export function QuickAddForm({ projectId, onOptimisticAdd }: QuickAddFormProps) {
  const queryClient = useQueryClient();

  async function addTaskAction(_prev: State, formData: FormData): Promise<State> {
    const result = taskSchema.shape.title.safeParse(formData.get("title") ?? "");
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    const clientId = crypto.randomUUID();
    onOptimisticAdd({
      id: clientId, clientId, title: result.data, status: "todo",
      points: 1, tags: [], projectId, pending: true,
    });

    try {
      await createTask({
        clientId, title: result.data, status: "todo",
        points: 1, tags: [], projectId,
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      return { error: null };
    } catch {
      return { error: "Could not save the task. Is json-server running?" };
    }
  }

  const [state, formAction] = useActionState(addTaskAction, { error: null });

  return (
    <form action={formAction} className="flex flex-wrap items-start gap-2">
      <label htmlFor="quick-title" className="sr-only">New task title</label>
      <Input id="quick-title" name="title" placeholder="Add a task..."
        className="max-w-sm"
        aria-invalid={!!state.error}
        aria-describedby={state.error ? "quick-error" : undefined} />
      <SubmitButton />
      {state.error && (
        <p id="quick-error" role="alert" className="w-full text-sm text-red-700 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
