import { useState, type FormEvent } from 'react'

interface Props {
  onAdd: (title: string) => void
  label: string
}

export function NewTaskForm({ onAdd, label }: Props) {
  const [title, setTitle] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="new-task" onSubmit={submit}>
      <input
        aria-label={label}
        placeholder="New task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={120}
      />
      <button type="submit" disabled={!title.trim()}>
        Add
      </button>
    </form>
  )
}
