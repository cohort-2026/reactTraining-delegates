import { describe, expect, it } from 'vitest'
import type { MutationMessage, ServerMessage, SnapshotMessage, Task } from '@taskboard/shared'
import {
  boardReducer,
  initialBoardState,
  selectPendingTaskIds,
  selectTasks,
  type BoardAction,
  type BoardState,
} from './boardReducer'

const task = (id: string, overrides: Partial<Task> = {}): Task => ({
  id,
  boardId: 'launch',
  title: `Task ${id}`,
  description: '',
  column: 'todo',
  order: 1,
  version: 1,
  createdBy: 'u-alice',
  updatedBy: 'u-alice',
  ...overrides,
})

const snapshot = (tasks: Task[]): SnapshotMessage => ({
  type: 'snapshot',
  board: { id: 'launch', name: 'Product launch' },
  me: { userId: 'u-alice', name: 'Alice Ng', role: 'owner' },
  tasks,
  presence: [{ userId: 'u-alice', name: 'Alice Ng', role: 'owner' }],
})

const server = (message: ServerMessage): BoardAction => ({ type: 'server', message })
const mutate = (mutation: MutationMessage): BoardAction => ({ type: 'mutate', mutation })
const run = (actions: BoardAction[], from: BoardState = initialBoardState) => actions.reduce(boardReducer, from)

const rename = (id: string, title: string, baseVersion = 1, clientMutationId = `rename-${id}`): MutationMessage => ({
  type: 'task.update',
  clientMutationId,
  taskId: id,
  baseVersion,
  changes: { title },
})

const titles = (state: BoardState) => selectTasks(state).map((t) => t.title)

describe('snapshot', () => {
  it('loads the board, me, presence and tasks, and marks the connection online', () => {
    const state = run([server(snapshot([task('a', { order: 2 }), task('b', { order: 1 })]))])
    expect(state.status).toBe('online')
    expect(state.board).toEqual({ id: 'launch', name: 'Product launch' })
    expect(state.me?.role).toBe('owner')
    expect(state.presence).toHaveLength(1)
    expect(selectTasks(state).map((t) => t.id)).toEqual(['b', 'a'])
  })

  it('replaces confirmed tasks completely, so tasks deleted while offline disappear', () => {
    const state = run([server(snapshot([task('a'), task('b')])), server(snapshot([task('b', { version: 3 })]))])
    expect(selectTasks(state)).toEqual([task('b', { version: 3 })])
  })

  it('keeps pending (queued) mutations across a resync and still shows them', () => {
    const state = run([
      server(snapshot([task('a')])),
      { type: 'status', status: 'reconnecting' },
      mutate(rename('a', 'Edited offline')),
      server(snapshot([task('a')])),
    ])
    expect(state.pending).toHaveLength(1)
    expect(titles(state)).toEqual(['Edited offline'])
  })
})

describe('optimistic updates', () => {
  const loaded = run([server(snapshot([task('a')]))])

  it('shows a created task immediately, before the server answers', () => {
    const state = boardReducer(loaded, mutate({
      type: 'task.create',
      clientMutationId: 'c-1',
      task: { id: 'new', title: 'Brand new', description: '', column: 'doing', order: 5 },
    }))
    expect(selectTasks(state).find((t) => t.id === 'new')).toMatchObject({
      title: 'Brand new', column: 'doing', version: 1, createdBy: 'u-alice', boardId: 'launch',
    })
    expect(state.confirmed.new).toBeUndefined()
    expect(selectPendingTaskIds(state).has('new')).toBe(true)
  })

  it('shows an update, a move and a delete immediately without touching confirmed', () => {
    const renamed = boardReducer(loaded, mutate(rename('a', 'Renamed')))
    expect(titles(renamed)).toEqual(['Renamed'])
    expect(renamed.confirmed.a.title).toBe('Task a')

    const moved = boardReducer(loaded, mutate({
      type: 'task.move', clientMutationId: 'm-1', taskId: 'a', baseVersion: 1, column: 'done', order: 9,
    }))
    expect(selectTasks(moved)[0]).toMatchObject({ column: 'done', order: 9 })

    const deleted = boardReducer(loaded, mutate({ type: 'task.delete', clientMutationId: 'd-1', taskId: 'a', baseVersion: 1 }))
    expect(selectTasks(deleted)).toEqual([])
    expect(deleted.confirmed.a).toBeDefined()
  })

  it('bumps the visible version, so a second edit before the ack carries the right baseVersion', () => {
    const state = run([mutate(rename('a', 'One', 1, 'r1'))], loaded)
    expect(selectTasks(state)[0].version).toBe(2)
  })
})

describe('acks', () => {
  const loaded = run([server(snapshot([task('a')]))])

  it('clears the pending mutation and stores the server\'s copy', () => {
    const state = run([
      mutate(rename('a', 'Renamed', 1, 'r1')),
      server({ type: 'ack', clientMutationId: 'r1', taskId: 'a', task: task('a', { title: 'Renamed', version: 2 }) }),
    ], loaded)
    expect(state.pending).toEqual([])
    expect(state.confirmed.a).toMatchObject({ title: 'Renamed', version: 2 })
    expect(selectTasks(state)[0].version).toBe(2)
    expect(selectPendingTaskIds(state).size).toBe(0)
  })

  it('removes the task from confirmed when a delete is acked', () => {
    expect(loaded.confirmed.a).toBeDefined()
    const state = run([
      mutate({ type: 'task.delete', clientMutationId: 'd1', taskId: 'a', baseVersion: 1 }),
      server({ type: 'ack', clientMutationId: 'd1', taskId: 'a', task: null }),
    ], loaded)
    expect(state.confirmed).toEqual({})
    expect(state.pending).toEqual([])
  })

  it('only clears the mutation that was acked', () => {
    const state = run([
      mutate(rename('a', 'First', 1, 'r1')),
      mutate(rename('a', 'Second', 2, 'r2')),
      server({ type: 'ack', clientMutationId: 'r1', taskId: 'a', task: task('a', { title: 'First', version: 2 }) }),
    ], loaded)
    expect(state.pending.map((m) => m.clientMutationId)).toEqual(['r2'])
    expect(titles(state)).toEqual(['Second'])
  })
})

describe('rejections and rollback', () => {
  const loaded = run([server(snapshot([task('a')]))])

  it('rolls back a rejected change and shows the reason', () => {
    const state = run([
      mutate(rename('a', 'Not allowed', 1, 'r1')),
      server({ type: 'error', code: 'FORBIDDEN', message: 'You do not have permission to do that.', clientMutationId: 'r1' }),
    ], loaded)
    expect(state.pending).toEqual([])
    expect(titles(state)).toEqual(['Task a'])
    expect(state.notice).toBe('You do not have permission to do that.')
  })

  it('rolls back a rejected create so the card disappears', () => {
    const state = run([
      mutate({ type: 'task.create', clientMutationId: 'c1', task: { id: 'new', title: 'Nope', description: '', column: 'todo', order: 2 } }),
      server({ type: 'error', code: 'FORBIDDEN', message: 'No.', clientMutationId: 'c1' }),
    ], loaded)
    expect(selectTasks(state).map((t) => t.id)).toEqual(['a'])
  })

  it('on CONFLICT, takes the server\'s current task instead of ours', () => {
    const theirs = task('a', { title: 'Bob got there first', version: 2, updatedBy: 'u-bob' })
    const state = run([
      mutate(rename('a', 'Mine', 1, 'r1')),
      server({ type: 'error', code: 'CONFLICT', message: 'Someone else changed this task first.', clientMutationId: 'r1', current: theirs }),
    ], loaded)
    expect(state.confirmed.a).toEqual(theirs)
    expect(titles(state)).toEqual(['Bob got there first'])
    expect(state.notice).toMatch(/someone else/i)
  })

  it('on NOT_FOUND with current: null, removes the task that no longer exists', () => {
    expect(selectTasks(loaded)).toHaveLength(1)
    const state = run([
      mutate(rename('a', 'Too late', 1, 'r1')),
      server({ type: 'error', code: 'NOT_FOUND', message: 'That task no longer exists.', clientMutationId: 'r1', current: null }),
    ], loaded)
    expect(selectTasks(state)).toEqual([])
  })

  it('keeps other pending mutations when one is rejected', () => {
    const state = run([
      mutate(rename('a', 'Rejected', 1, 'r1')),
      mutate({ type: 'task.create', clientMutationId: 'c1', task: { id: 'b', title: 'Still here', description: '', column: 'todo', order: 5 } }),
      server({ type: 'error', code: 'FORBIDDEN', message: 'No.', clientMutationId: 'r1' }),
    ], loaded)
    expect(titles(state)).toEqual(['Task a', 'Still here'])
  })

  it('can dismiss the notice', () => {
    const state = run([server({ type: 'error', code: 'INVALID', message: 'Bad message' }), { type: 'dismissNotice' }], loaded)
    expect(state.notice).toBeNull()
  })
})

describe('changes from other users', () => {
  const loaded = run([server(snapshot([task('a'), task('b', { order: 2 })]))])

  it('applies created, updated and deleted broadcasts', () => {
    const state = run([
      server({ type: 'task.created', task: task('c', { order: 3 }), by: 'u-bob' }),
      server({ type: 'task.updated', task: task('a', { title: 'Bob renamed', version: 2 }), by: 'u-bob' }),
      server({ type: 'task.deleted', taskId: 'b', by: 'u-bob' }),
    ], loaded)
    expect(titles(state)).toEqual(['Bob renamed', 'Task c'])
  })

  it('ignores a broadcast that is older than the copy we already hold', () => {
    const state = run([
      server({ type: 'task.updated', task: task('a', { title: 'v3', version: 3 }), by: 'u-bob' }),
      server({ type: 'task.updated', task: task('a', { title: 'v2', version: 2 }), by: 'u-bob' }),
    ], loaded)
    expect(state.confirmed.a.title).toBe('v3')
  })

  it('keeps our pending change on top of a remote change to a different task', () => {
    const state = run([
      mutate(rename('a', 'Mine', 1, 'r1')),
      server({ type: 'task.updated', task: task('b', { title: 'Theirs', version: 2, order: 2 }), by: 'u-bob' }),
    ], loaded)
    expect(titles(state)).toEqual(['Mine', 'Theirs'])
  })
})

describe('presence', () => {
  const loaded = run([server(snapshot([]))])
  const bob = { userId: 'u-bob', name: 'Bob Ortiz', role: 'member' as const }

  it('adds a user on join, once, and removes them on leave', () => {
    const joined = run([server({ type: 'presence.join', user: bob }), server({ type: 'presence.join', user: bob })], loaded)
    expect(joined.presence.map((p) => p.userId)).toEqual(['u-alice', 'u-bob'])

    const left = boardReducer(joined, server({ type: 'presence.leave', userId: 'u-bob' }))
    expect(left.presence.map((p) => p.userId)).toEqual(['u-alice'])
  })
})

describe('connection status', () => {
  it('records status changes', () => {
    expect(boardReducer(initialBoardState, { type: 'status', status: 'reconnecting' }).status).toBe('reconnecting')
  })
})
