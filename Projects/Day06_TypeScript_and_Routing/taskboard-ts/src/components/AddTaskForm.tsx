import { useEffect, useRef, useState } from "react";

type FormState = {
  title: string;
  assignee: string;
  points: number;
};

type NewTask = {
  title: string;
  assignee: string;
  points: number;
};

type AddTaskFormProps = {
  onAdd: (task: NewTask) => void;
};

const emptyForm: FormState = { title: "", assignee: "", points: 1 };

function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = form.title.trim();
    if (title.length < 3) {
      setError("Title needs 3+ characters.");
      return;
    }
    setError("");
    onAdd({
      title,
      assignee: form.assignee.trim(),
      points: Number(form.points),
    });
    setForm(emptyForm);
    titleInputRef.current?.focus();
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={form.title}
        aria-invalid={Boolean(error)}
        onChange={handleChange}
        ref={titleInputRef}
      />

      <label htmlFor="assignee">Assignee</label>
      <input
        id="assignee"
        name="assignee"
        value={form.assignee}
        onChange={handleChange}
      />

      <label htmlFor="points">Points</label>
      <input
        id="points"
        name="points"
        type="number"
        min="1"
        value={form.points}
        onChange={handleChange}
      />

      {error && <p role="alert">{error}</p>}
      <button type="submit">Add task</button>
    </form>
  );
}

export default AddTaskForm;