import { useMemo } from 'react'
import type { ColumnId, MutationInput, Task } from '@taskboard/shared'
import { COLUMNS } from '@taskboard/shared'
import { selectPendingTaskIds, selectTasks } from '../board/boardReducer'
import { orderAtEnd } from '../board/ordering'
import { useBoardSocket } from '../board/useBoardSocket'
import { Board, type BoardHandlers } from './Board'
import { ConnectionBanner } from './ConnectionBanner'
import { PresenceBar } from './PresenceBar'

interface Props {
  token: string
  boardId: string
  onUnauthorised: () => void
}

export function BoardPage({ token, boardId, onUnauthorised }: Props) {
  const { state, mutate, dismissNotice } = useBoardSocket({ token, boardId, onUnauthorised })
  const tasks = useMemo(() => selectTasks(state), [state])
  const pendingIds = useMemo(() => selectPendingTaskIds(state), [state])

  const me = state.me
  // Cosmetic only: hides buttons the user cannot use. The SERVER decides.
  const canEdit = me?.role === 'owner' || me?.role === 'member'
  const canDelete = (task: Task) => me?.role === 'owner' || (me?.role === 'member' && task.createdBy === me.userId)

  const send = (input: MutationInput) => mutate(input)
  const handlers: BoardHandlers = {
    onCreate: (title: string, column: ColumnId) =>
      send({
        type: 'task.create',
        task: { id: crypto.randomUUID(), title, description: '', column, order: orderAtEnd(tasks, column) },
      }),
    onRename: (task, title, baseVersion) =>
      send({ type: 'task.update', taskId: task.id, baseVersion, changes: { title } }),
    onMove: (task, direction) => {
      const column = COLUMNS[COLUMNS.indexOf(task.column) + direction]
      if (!column) return
      send({ type: 'task.move', taskId: task.id, baseVersion: task.version, column, order: orderAtEnd(tasks, column) })
    },
    onDelete: (task) => send({ type: 'task.delete', taskId: task.id, baseVersion: task.version }),
  }

  return (
    <main className="board-page">
      <div className="board-toolbar">
        <h2>{state.board?.name ?? 'Loading board…'}</h2>
        {me && <span className={`role-badge role-${me.role}`}>{me.role}</span>}
        <PresenceBar users={state.presence} meId={me?.userId} />
      </div>

      <ConnectionBanner status={state.status} queued={state.pending.length} />

      {state.notice && (
        <div className="notice notice-warning" role="alert">
          <span>{state.notice}</span>
          <button type="button" className="link-button" onClick={dismissNotice}>
            Dismiss
          </button>
        </div>
      )}

      {state.board && (
        <Board
          tasks={tasks}
          pendingIds={pendingIds}
          canEdit={canEdit}
          canDelete={canDelete}
          {...handlers}
        />
      )}
    </main>
  )
}
