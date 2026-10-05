import { useState } from 'react'
import type { ChangeEvent } from 'react'
import type { Status, Task } from '../types'

type TaskCardProps = {
  task: Task
  onStatusChange: (id: string, status: Status) => void
  onRename: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onStatusChange, onRename, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)

  function handleSave() {
    const title = draft.trim()
    if (title === '') return
    onRename(task.id, title)
    setIsEditing(false)
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) onDelete(task.id)
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(task.id, event.target.value as Status)
  }

  return (
    <article className="card">
      {isEditing ? (
        <>
          <input aria-label="Task title" value={draft} onChange={(event) => setDraft(event.target.value)} />
          <button type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span>{task.points} pts</span>}
      <select aria-label="Status" value={task.status} onChange={handleStatusChange}>
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>
      <button type="button" onClick={handleDeleteClick}>Delete</button>
    </article>
  )
}