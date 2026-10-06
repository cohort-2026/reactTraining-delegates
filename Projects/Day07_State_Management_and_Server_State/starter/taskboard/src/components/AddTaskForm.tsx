import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useAddTask } from "../hooks/useAddTask";

type FormState = {
  title: string;
  assignee: string;
  points: string;
};

const emptyForm: FormState = { title: "", assignee: "", points: "1" };

type AddTaskFormProps = {
  projectId: string;
};

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
    addTask.mutate({
      title,
      assignee: form.assignee.trim(),
      points: Number(form.points),
      status: "todo",
      projectId,
    }, { onSuccess: () => setForm(emptyForm) });
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" ref={inputRef} value={form.title}
        aria-invalid={Boolean(error)} onChange={handleChange} />

      <label htmlFor="assignee">Assignee</label>
      <input id="assignee" name="assignee" value={form.assignee}
        onChange={handleChange} />

      <label htmlFor="points">Points</label>
      <input id="points" name="points" type="number" min="1"
        value={form.points} onChange={handleChange} />

      {error && <p role="alert">{error}</p>}
      {addTask.isError && <p role="alert">{addTask.error.message}</p>}
      <button type="submit" disabled={addTask.isPending}>
        {addTask.isPending ? "Adding..." : "Add task"}
      </button>
    </form>
  );
}

export default AddTaskForm;
