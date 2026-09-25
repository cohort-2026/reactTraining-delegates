import type { MutationMessage, PresenceUser, ServerMessage, Task } from '@taskboard/shared'

/**
 * Optimistic board state.
 *
 * The trick is to keep TWO things apart:
 *
 *   confirmed  what the server has told us is true
 *   pending    what this tab has asked for and not yet heard back about
 *
 * What the user SEES is `confirmed` with `pending` replayed on top
 * (see `selectTasks`). So:
 *
 *   - optimistic update  = push onto `pending`
 *   - ack                = drop from `pending`, write the server's copy into `confirmed`
 *   - rejection/rollback = drop from `pending` (and take the server's copy if it sent one)
 *
 * Rollback never has to "undo" anything, because nothing in `confirmed` was
 * ever changed optimistically.
 */

export type ConnectionStatus = 'connecting' | 'online' | 'reconnecting' | 'unauthorised' | 'forbidden'

export interface BoardState {
  status: ConnectionStatus
  board: { id: string; name: string } | null
  me: PresenceUser | null
  confirmed: Record<string, Task>
  pending: MutationMessage[]
  presence: PresenceUser[]
  /** The latest message to show the user, e.g. why a change was rejected. */
  notice: string | null
}

export type BoardAction =
  | { type: 'mutate'; mutation: MutationMessage }
  | { type: 'server'; message: ServerMessage }
  | { type: 'status'; status: ConnectionStatus }
  | { type: 'dismissNotice' }

export const initialBoardState: BoardState = {
  status: 'connecting',
  board: null,
  me: null,
  confirmed: {},
  pending: [],
  presence: [],
  notice: null,
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'status':
      return { ...state, status: action.status }
    case 'dismissNotice':
      return { ...state, notice: null }
    case 'mutate':
      // TODO (milestone 3): remember the mutation as pending.
      return state
    case 'server':
      // TODO (milestones 2 to 5): handle every ServerMessage. A `switch (action.message.type)`
      // narrows each case for you. Things to get right:
      //  - snapshot: REPLACE confirmed (tasks deleted while offline must go), KEEP pending, status 'online'
      //  - ack: drop that pending mutation; store msg.task, or remove msg.taskId when task is null
      //  - error with clientMutationId: drop that pending mutation (that IS the rollback),
      //    take `current` when it is a Task, remove the task when `current` is null, set `notice`
      //  - error without clientMutationId: just set `notice`
      //  - task.created / task.updated / task.deleted from other users
      //  - never replace a task with an OLDER version of itself
      //  - presence.join (no duplicates) / presence.leave
      return state
  }
}

/**
 * The tasks the user should see: confirmed + pending, sorted by `order`.
 *
 * TODO (milestone 3): start from a COPY of `confirmed` and replay every pending
 * mutation on top, in order, the way the server would apply it:
 *  - create: add the task (version 1, boardId and createdBy from state)
 *  - update / move: merge the changes AND bump the version by one, so a second
 *    edit made before the first is acked carries the version the server will have
 *  - delete: remove it
 */
export function selectTasks(state: BoardState): Task[] {
  return Object.values(state.confirmed).sort((a, b) => a.order - b.order)
}

/**
 * Ids of tasks with a change still waiting for the server, for a "saving" hint.
 * TODO (milestone 3).
 */
export function selectPendingTaskIds(_state: BoardState): Set<string> {
  return new Set()
}
