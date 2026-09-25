import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useAddTask } from "@/hooks/useAddTask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AddTaskFormProps = {
  projectId: string;
};

type FormState = {
  title: string;
  assignee: string;
  points: string;
};

const emptyForm: FormState = { title: "", assignee: "", points: "1" };

function AddTaskForm({ projectId }: AddTaskFormProps) {
  const addTask = useAddTask();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = form.title.trim();
    if (title.length < 3) {
      setError("Title needs 3+ characters.");
      return;
    }
    setError("");
    // No id: json-server creates it
    addTask.mutate(
      {
        title,
        assignee: form.assignee.trim(),
        points: Number(form.points),
        status: "todo",
        tags: [],
        projectId,
      },
      { onSuccess: () => setForm(emptyForm) },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" ref={inputRef} value={form.title} className="w-64"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "title-error" : undefined}
          onChange={handleChange} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="assignee">Assignee</Label>
        <Input id="assignee" name="assignee" value={form.assignee} className="w-40"
          onChange={handleChange} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="points">Points</Label>
        <Input id="points" name="points" type="number" min="1" className="w-20"
          value={form.points} onChange={handleChange} />
      </div>

      <Button type="submit" disabled={addTask.isPending}>
        {addTask.isPending ? "Adding..." : "Add task"}
      </Button>

      {error && (
        <p id="title-error" role="alert" className="w-full text-sm text-red-700 dark:text-red-400">{error}</p>
      )}
      {addTask.isError && (
        <p role="alert" className="w-full text-sm text-red-700 dark:text-red-400">
          Could not save the task: {addTask.error.message}
        </p>
      )}
    </form>
  );
}

export default AddTaskForm;
