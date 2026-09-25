import type { WebSocket } from 'ws'
import { send, type Hub } from './hub'
import type { Store } from './store'

export interface ConnectionDeps {
  store: Store
  hub: Hub
  jwtSecret: string
  authTimeoutMs: number
}

/**
 * Runs once per socket. The life of a connection:
 *
 *   open --(auth within authTimeoutMs)--> authenticated --(close)--> gone
 *     \--(anything else / bad token / timeout)--> closed with 4001
 *
 * TODO (milestone 1: the authenticated socket)
 *  - Start a timer: if no valid `auth` arrives within deps.authTimeoutMs,
 *    close with CLOSE_UNAUTHENTICATED.
 *  - Parse EVERY message with `parseClientMessage` from @taskboard/shared.
 *  - Until the socket is authenticated, the only acceptable message is a valid
 *    `auth`. Anything else: close with CLOSE_UNAUTHENTICATED.
 *  - `auth`: verifyToken; the user must exist; then the user must have a role on
 *    msg.boardId, otherwise close with CLOSE_FORBIDDEN.
 *  - `verifyToken` is async. Make sure a message that arrives while it is running
 *    is not handled as if the socket were still anonymous (hint: a promise chain).
 *  - Close with CLOSE_UNAUTHENTICATED when the token expires (a timer, and a
 *    check on every message).
 *
 * TODO (milestone 2: snapshot and broadcast)
 *  - After a good `auth`: build a Session, hub.join(session), send a `snapshot`.
 *  - After an authenticated mutation: applyMutation(store, session, msg).
 *    Rejected: send the error to this socket only.
 *    Accepted: send the ack to this socket, broadcast to everyone ELSE on the board.
 *  - An invalid message from an authenticated socket gets an INVALID error; keep the socket open.
 *
 * TODO (milestone 5: presence)
 *  - hub.join returns true for the user's first tab: broadcast presence.join to the others.
 *  - On 'close': clear your timers, hub.leave(session); when it returns true
 *    (the user's last tab), broadcast presence.leave.
 */
export function handleConnection(socket: WebSocket, _deps: ConnectionDeps) {
  // Placeholder so the app runs. Replace all of it.
  socket.on('message', () => {
    send(socket, { type: 'error', code: 'INTERNAL', message: 'TODO: handleConnection is not written yet.' })
  })
}
