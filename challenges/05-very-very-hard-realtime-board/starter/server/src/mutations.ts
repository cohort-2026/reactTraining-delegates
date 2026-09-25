import type { AckMessage, ErrorMessage, MutationMessage, ServerMessage } from '@taskboard/shared'
// You will need these too:
// import type { ErrorCode, Task } from '@taskboard/shared'
// import { can } from './permissions'
import type { Store } from './store'

/** Who is asking, and on which board. Comes from the verified token, never from the message. */
export interface Actor {
  userId: string
  boardId: string
}

export type MutationResult =
  | {
      ok: true
      /** Send to the socket that made the change. */
      ack: AckMessage
      /** Send to everyone else on the board, or null when there is nothing new to tell them. */
      broadcast: ServerMessage | null
    }
  | { ok: false; error: ErrorMessage }

/**
 * Apply one mutation to the store. Pure apart from the store: no sockets, so it
 * is easy to unit test.
 *
 * Order matters:
 *  1. replay?      the same clientMutationId again returns the original ack
 *  2. role         looked up NOW, on every message, so a demotion takes effect at once
 *  3. the task     must exist AND belong to the actor's board
 *  4. permission   can(role, action, ...)
 *  5. version      baseVersion must equal the stored version
 *  6. write        bump the version and save
 */
export function applyMutation(_store: Store, _actor: Actor, _msg: MutationMessage): MutationResult {
  // TODO (milestones 3, 4 and 6). Follow the numbered order in the comment above.
  //
  //  - Build every error with `clientMutationId: msg.clientMutationId`, so the
  //    client knows which optimistic change to roll back.
  //  - task.create: version 1, boardId from the ACTOR (not the message), createdBy = actor.
  //  - update / move: spread the changes, bump the version, set updatedBy.
  //  - delete: ack with `task: null`.
  //  - CONFLICT errors carry `current` (the stored task); NOT_FOUND carries `current: null`.
  //  - Broadcasts: task.created, task.updated (for update AND move), task.deleted.
  //  - Milestone 6: remember each successful ack with store.rememberProcessed(key, ack)
  //    and return it (with broadcast: null) if the same clientMutationId comes again.
  throw new Error('TODO: applyMutation')
}
