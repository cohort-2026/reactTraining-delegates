import type { AckMessage, BoardSummary, PublicUser, Role, Task } from '@taskboard/shared'

/**
 * An in-memory "database". Everything is lost when the server restarts, which
 * is exactly what you want for a training exercise. Swapping it for Postgres
 * later means re-implementing these methods, not changing the callers.
 */

interface UserRecord extends PublicUser {
  username: string
  /** Plain text for the demo ONLY. A real app stores a slow hash (argon2, bcrypt). */
  password: string
}

interface BoardRecord {
  id: string
  name: string
  members: Record<string, Role>
}

export class Store {
  private users = new Map<string, UserRecord>()
  private boards = new Map<string, BoardRecord>()
  private tasks = new Map<string, Task>()
  /** Successful mutations by `${userId}:${clientMutationId}`, so a replay is harmless. */
  private processed = new Map<string, AckMessage>()

  addUser(user: UserRecord) {
    this.users.set(user.id, user)
  }

  addBoard(board: BoardRecord) {
    this.boards.set(board.id, board)
  }

  /** Returns the user when the username and password match, otherwise undefined. */
  checkCredentials(username: string, password: string): PublicUser | undefined {
    const user = [...this.users.values()].find((u) => u.username === username)
    if (!user || user.password !== password) return undefined
    return { id: user.id, name: user.name }
  }

  getUser(userId: string): PublicUser | undefined {
    const user = this.users.get(userId)
    return user && { id: user.id, name: user.name }
  }

  getBoard(boardId: string): { id: string; name: string } | undefined {
    const board = this.boards.get(boardId)
    return board && { id: board.id, name: board.name }
  }

  /** The user's role on the board, or undefined when they are not a member. */
  getRole(boardId: string, userId: string): Role | undefined {
    return this.boards.get(boardId)?.members[userId]
  }

  /** Change (or with `undefined`, remove) a member's role. Takes effect on the next message. */
  setRole(boardId: string, userId: string, role: Role | undefined) {
    const board = this.boards.get(boardId)
    if (!board) return
    if (role) board.members[userId] = role
    else delete board.members[userId]
  }

  boardsFor(userId: string): BoardSummary[] {
    return [...this.boards.values()]
      .filter((b) => b.members[userId])
      .map((b) => ({ id: b.id, name: b.name, role: b.members[userId] }))
  }

  tasksFor(boardId: string): Task[] {
    return [...this.tasks.values()]
      .filter((t) => t.boardId === boardId)
      .sort((a, b) => a.order - b.order)
  }

  getTask(taskId: string): Task | undefined {
    const task = this.tasks.get(taskId)
    return task && { ...task }
  }

  putTask(task: Task) {
    this.tasks.set(task.id, { ...task })
  }

  deleteTask(taskId: string) {
    this.tasks.delete(taskId)
  }

  getProcessed(key: string): AckMessage | undefined {
    return this.processed.get(key)
  }

  rememberProcessed(key: string, ack: AckMessage) {
    this.processed.set(key, ack)
    // Keep the map bounded: Maps iterate in insertion order, so the first key is the oldest.
    if (this.processed.size > 5_000) {
      const oldest = this.processed.keys().next().value
      if (oldest !== undefined) this.processed.delete(oldest)
    }
  }
}

/** Demo data. Every user's password is `password123`. */
export function createSeededStore(): Store {
  const store = new Store()
  store.addUser({ id: 'u-alice', username: 'alice', name: 'Alice Ng', password: 'password123' })
  store.addUser({ id: 'u-bob', username: 'bob', name: 'Bob Ortiz', password: 'password123' })
  store.addUser({ id: 'u-carol', username: 'carol', name: 'Carol Singh', password: 'password123' })

  store.addBoard({
    id: 'launch',
    name: 'Product launch',
    members: { 'u-alice': 'owner', 'u-bob': 'member', 'u-carol': 'viewer' },
  })
  store.addBoard({
    id: 'ops',
    name: 'Ops rota',
    members: { 'u-bob': 'owner', 'u-alice': 'viewer' },
  })

  const seed: Array<Pick<Task, 'id' | 'boardId' | 'title' | 'column' | 'createdBy'>> = [
    { id: 't-1', boardId: 'launch', title: 'Write the press release', column: 'todo', createdBy: 'u-alice' },
    { id: 't-2', boardId: 'launch', title: 'Book the launch venue', column: 'todo', createdBy: 'u-bob' },
    { id: 't-3', boardId: 'launch', title: 'Record the demo video', column: 'doing', createdBy: 'u-bob' },
    { id: 't-4', boardId: 'launch', title: 'Agree the price', column: 'done', createdBy: 'u-alice' },
    { id: 't-5', boardId: 'ops', title: 'Rotate the on-call pager', column: 'todo', createdBy: 'u-bob' },
    { id: 't-6', boardId: 'ops', title: 'Patch the build agents', column: 'doing', createdBy: 'u-bob' },
  ]
  seed.forEach((t, i) =>
    store.putTask({ ...t, description: '', order: i + 1, version: 1, updatedBy: t.createdBy }),
  )
  return store
}
