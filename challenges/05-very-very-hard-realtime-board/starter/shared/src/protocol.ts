/**
 * The wire protocol shared by the server and the client.
 *
 * - Messages the CLIENT sends are described by Zod schemas, because the server
 *   must never trust them: it validates every one with `parseClientMessage`.
 * - Messages the SERVER sends are plain TypeScript types. The client trusts the
 *   server it authenticated with, so a type is enough.
 *
 * Both sides are discriminated unions on `type`, so a `switch (msg.type)`
 * narrows each branch to the right shape.
 */
import { z } from 'zod'

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export const ROLES = ['owner', 'member', 'viewer'] as const
export type Role = (typeof ROLES)[number]

export const COLUMNS = ['todo', 'doing', 'done'] as const
export type ColumnId = (typeof COLUMNS)[number]

export const COLUMN_TITLES: Record<ColumnId, string> = {
  todo: 'To do',
  doing: 'In progress',
  done: 'Done',
}

export interface Task {
  id: string
  boardId: string
  title: string
  description: string
  column: ColumnId
  /** Sort key inside a column. Lower comes first. */
  order: number
  /** Bumped by the server on every successful change. Starts at 1. */
  version: number
  createdBy: string
  updatedBy: string
}

export interface BoardSummary {
  id: string
  name: string
  role: Role
}

export interface PublicUser {
  id: string
  name: string
}

export interface PresenceUser {
  userId: string
  name: string
  role: Role
}

// ---------------------------------------------------------------------------
// HTTP: POST /login
// ---------------------------------------------------------------------------

export const loginRequestSchema = z.object({
  username: z.string().trim().min(1).max(50),
  password: z.string().min(1).max(200),
})
export type LoginRequest = z.infer<typeof loginRequestSchema>

export interface LoginResponse {
  token: string
  user: PublicUser
  boards: BoardSummary[]
}

// ---------------------------------------------------------------------------
// WebSocket close codes (4000-4999 are free for applications to use)
// ---------------------------------------------------------------------------

/** No token, a bad token, an expired token, or no `auth` message in time. Do NOT reconnect. */
export const CLOSE_UNAUTHENTICATED = 4001
/** The token is valid but the user has no role on this board. Do NOT reconnect. */
export const CLOSE_FORBIDDEN = 4003

// ---------------------------------------------------------------------------
// Client -> server
// ---------------------------------------------------------------------------

const id = z.string().min(1).max(64)
const title = z.string().trim().min(1, 'Title is required').max(120)
const description = z.string().max(2000)
const column = z.enum(COLUMNS)
const order = z.number().finite()
const baseVersion = z.number().int().positive()

export const authMessageSchema = z.object({
  type: z.literal('auth'),
  token: z.string().min(1).max(4096),
  boardId: id,
})

export const taskCreateSchema = z.object({
  type: z.literal('task.create'),
  clientMutationId: id,
  task: z.object({
    // The client picks the id (crypto.randomUUID()) so the optimistic card
    // and the confirmed card are the same card.
    id,
    title,
    description: description.default(''),
    column,
    order,
  }),
})

export const taskUpdateSchema = z.object({
  type: z.literal('task.update'),
  clientMutationId: id,
  taskId: id,
  baseVersion,
  changes: z
    .object({ title: title.optional(), description: description.optional() })
    .refine((c) => c.title !== undefined || c.description !== undefined, 'Nothing to update'),
})

export const taskMoveSchema = z.object({
  type: z.literal('task.move'),
  clientMutationId: id,
  taskId: id,
  baseVersion,
  column,
  order,
})

export const taskDeleteSchema = z.object({
  type: z.literal('task.delete'),
  clientMutationId: id,
  taskId: id,
  baseVersion,
})

export const clientMessageSchema = z.discriminatedUnion('type', [
  authMessageSchema,
  taskCreateSchema,
  taskUpdateSchema,
  taskMoveSchema,
  taskDeleteSchema,
])

export type AuthMessage = z.infer<typeof authMessageSchema>
export type TaskCreateMessage = z.infer<typeof taskCreateSchema>
export type TaskUpdateMessage = z.infer<typeof taskUpdateSchema>
export type TaskMoveMessage = z.infer<typeof taskMoveSchema>
export type TaskDeleteMessage = z.infer<typeof taskDeleteSchema>
export type ClientMessage = z.infer<typeof clientMessageSchema>
/** Every client message except `auth`: the ones that change the board. */
export type MutationMessage = Exclude<ClientMessage, AuthMessage>
/** What the UI asks for: a mutation before it has been given a clientMutationId. */
export type MutationInput = MutationMessage extends infer M
  ? M extends MutationMessage
    ? Omit<M, 'clientMutationId'>
    : never
  : never

export type ParseResult =
  | { ok: true; message: ClientMessage }
  | { ok: false; error: string }

/** Parse raw socket data (string or Buffer) into a validated ClientMessage. */
export function parseClientMessage(raw: unknown): ParseResult {
  let json: unknown
  try {
    json = JSON.parse(String(raw))
  } catch {
    return { ok: false, error: 'Message is not valid JSON' }
  }
  const result = clientMessageSchema.safeParse(json)
  if (!result.success) {
    return { ok: false, error: z.prettifyError(result.error) }
  }
  return { ok: true, message: result.data }
}

// ---------------------------------------------------------------------------
// Server -> client
// ---------------------------------------------------------------------------

export type ErrorCode =
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'INVALID'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL'

export interface SnapshotMessage {
  type: 'snapshot'
  board: { id: string; name: string }
  me: PresenceUser
  tasks: Task[]
  presence: PresenceUser[]
}

export interface AckMessage {
  type: 'ack'
  clientMutationId: string
  taskId: string
  /** The server's copy after the change, or null when the task was deleted. */
  task: Task | null
}

export interface TaskCreatedMessage {
  type: 'task.created'
  task: Task
  by: string
}

/** Sent for both `task.update` and `task.move`: either way the task changed. */
export interface TaskUpdatedMessage {
  type: 'task.updated'
  task: Task
  by: string
}

export interface TaskDeletedMessage {
  type: 'task.deleted'
  taskId: string
  by: string
}

export interface PresenceJoinMessage {
  type: 'presence.join'
  user: PresenceUser
}

export interface PresenceLeaveMessage {
  type: 'presence.leave'
  userId: string
}

export interface ErrorMessage {
  type: 'error'
  code: ErrorCode
  message: string
  /** Present when the error rejects a specific mutation. */
  clientMutationId?: string
  /**
   * CONFLICT: the server's current copy, so the client can reconcile.
   * NOT_FOUND: null, meaning "this task no longer exists".
   */
  current?: Task | null
}

export type ServerMessage =
  | SnapshotMessage
  | AckMessage
  | TaskCreatedMessage
  | TaskUpdatedMessage
  | TaskDeletedMessage
  | PresenceJoinMessage
  | PresenceLeaveMessage
  | ErrorMessage
