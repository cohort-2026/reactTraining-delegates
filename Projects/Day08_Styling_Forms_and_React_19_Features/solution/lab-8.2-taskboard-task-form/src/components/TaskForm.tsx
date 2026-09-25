import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schemas/task";
import type { TaskFormValues, TaskInput } from "@/schemas/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TaskFormProps = {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskInput) => Promise<unknown>;
};

export function TaskForm({ defaultValues, onSubmit }: TaskFormProps) {
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues, unknown, TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", status: "todo", points: 1, ...defaultValues },
  });

  async function submit(values: TaskInput) {
    await onSubmit(values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined} />
        {errors.title && (
          <p id="title-error" role="alert" className="text-sm text-red-700 dark:text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <select id="status" {...register("status")}
          className="h-9 rounded-md border bg-transparent px-2">
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="points">Points</Label>
        <Input id="points" type="number" {...register("points")}
          aria-invalid={!!errors.points}
          aria-describedby={errors.points ? "points-error" : undefined} />
        {errors.points && (
          <p id="points-error" role="alert" className="text-sm text-red-700 dark:text-red-400">
            {errors.points.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="assignee">Assignee</Label>
        <Input id="assignee" {...register("assignee")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
