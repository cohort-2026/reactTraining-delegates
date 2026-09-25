import { useState, type FormEvent } from 'react'
import type { Task } from '@taskboard/shared'
import type { BoardHandlers } from './Board'

interface Props extends Omit<BoardHandlers, 'onCreate'> {
  task: Task
  /** A change to this task is waiting for the server. */
  pending: boolean
  canEdit: boolean
  canDelete: boolean
  canMoveLeft: boolean
  canMoveRight: boolean
}

export function TaskCard({ task, pending, canEdit, canDelete, canMoveLeft, canMoveRight, onRename, onMove, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  // The version the user STARTED editing from. If someone else saves in the
  // meantime, the server sees a stale baseVersion and reports a conflict,
  // instead of this edit silently overwriting theirs.
  const [editBaseVersion, setEditBaseVersion] = useState(task.version)

  function startEditing() {
    setDraft(task.title)
    setEditBaseVersion(task.version)
    setEditing(true)
  }

  function save(event: FormEvent) {
    event.preventDefault()
    const title = draft.trim()
    if (title && title !== task.title) onRename(task, title, editBaseVersion)
    setEditing(false)
  }

  return (
    <li className={`card${pending ? ' card-pending' : ''}`} aria-busy={pending}>
      {editing ? (
        <form onSubmit={save} className="card-edit">
          <input
            aria-label="Task title"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setEditing(false)}
            maxLength={120}
            autoFocus
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p className="card-title">{task.title}</p>
      )}

      <div className="card-footer">
        <span className="card-meta">
          {pending ? 'Saving…' : `v${task.version}`}
        </span>
        {canEdit && !editing && (
          <div className="card-actions">
            <button type="button" onClick={() => onMove(task, -1)} disabled={!canMoveLeft} aria-label={`Move "${task.title}" left`}>
              ←
            </button>
            <button type="button" onClick={() => onMove(task, 1)} disabled={!canMoveRight} aria-label={`Move "${task.title}" right`}>
              →
            </button>
            <button type="button" onClick={startEditing} aria-label={`Rename "${task.title}"`}>
              Edit
            </button>
            {canDelete && (
              <button type="button" className="danger" onClick={() => onDelete(task)} aria-label={`Delete "${task.title}"`}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
