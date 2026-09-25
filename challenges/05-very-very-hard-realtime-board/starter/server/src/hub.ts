import { WebSocket } from 'ws'
import type { PresenceUser, ServerMessage } from '@taskboard/shared'
import type { Store } from './store'

/** One authenticated socket. A user with two tabs open has two sessions. */
export interface Session {
  socket: WebSocket
  userId: string
  name: string
  boardId: string
  /** Token expiry, Unix ms. */
  expiresAt: number
}

export function send(socket: WebSocket, message: ServerMessage) {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message))
}

/** Tracks which sessions are on which board, for broadcasting and presence. */
export class Hub {
  private rooms = new Map<string, Set<Session>>()
  private store: Store

  constructor(store: Store) {
    this.store = store
  }

  /** Add a session. Returns true when this is the user's FIRST session on the board. */
  join(session: Session): boolean {
    const room = this.rooms.get(session.boardId) ?? new Set<Session>()
    this.rooms.set(session.boardId, room)
    const firstForUser = !this.hasUser(session.boardId, session.userId)
    room.add(session)
    return firstForUser
  }

  /** Remove a session. Returns true when the user has NO sessions left on the board. */
  leave(session: Session): boolean {
    const room = this.rooms.get(session.boardId)
    if (!room?.delete(session)) return false
    if (room.size === 0) this.rooms.delete(session.boardId)
    return !this.hasUser(session.boardId, session.userId)
  }

  hasUser(boardId: string, userId: string): boolean {
    return [...(this.rooms.get(boardId) ?? [])].some((s) => s.userId === userId)
  }

  /** Send to every session on the board, except `except` (usually the sender). */
  broadcast(boardId: string, message: ServerMessage, except?: Session) {
    for (const session of this.rooms.get(boardId) ?? []) {
      if (session !== except) send(session.socket, message)
    }
  }

  /** One entry per connected user (not per tab). */
  presence(boardId: string): PresenceUser[] {
    const users = new Map<string, PresenceUser>()
    for (const s of this.rooms.get(boardId) ?? []) {
      const role = this.store.getRole(boardId, s.userId)
      if (role) users.set(s.userId, { userId: s.userId, name: s.name, role })
    }
    return [...users.values()]
  }

  sessions(): Session[] {
    return [...this.rooms.values()].flatMap((room) => [...room])
  }
}
