import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import type { NewTask } from '../types'

type AddTaskFormProps = { onAdd: (task: NewTask) => void }
type TaskForm = { title: string; assignee: string; points: number }

const emptyForm: TaskForm = { title: '', assignee: '', points: 1 }

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm((previous) => ({
      ...previous,
      [name]: name === 'points' ? Number(value) : value,
    }))
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = form.title.trim()
    if (title.length < 3) {
      setError('Title needs 3+ characters.')
      return
    }

    setError('')
    onAdd({ title, assignee: form.assignee.trim(), points: form.points })
    setForm(emptyForm)
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" ref={inputRef} value={form.title}
        aria-invalid={Boolean(error)} onChange={handleChange} />
      <label htmlFor="assignee">Assignee</label>
      <input id="assignee" name="assignee" value={form.assignee} onChange={handleChange} />
      <label htmlFor="points">Points</label>
      <input id="points" name="points" type="number" min="1" value={form.points} onChange={handleChange} />
      <button type="submit">Add task</button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}