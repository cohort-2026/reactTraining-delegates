import { beforeEach, describe, expect, it } from 'vitest'
import type { MutationMessage } from '@taskboard/shared'
import { applyMutation, type Actor } from './mutations'
import { createSeededStore, type Store } from './store'

// Seed data (see store.ts): board "launch" has alice = owner, bob = member,
// carol = viewer. t-1 was created by alice, t-2 by bob. Every task starts at version 1.
const alice: Actor = { userId: 'u-alice', boardId: 'launch' }
const bob: Actor = { userId: 'u-bob', boardId: 'launch' }
const carol: Actor = { userId: 'u-carol', boardId: 'launch' }

let store: Store
let n = 0
const cmid = () => `m-${++n}`

const update = (taskId: string, baseVersion: number, title = 'New title'): MutationMessage => ({
  type: 'task.update',
  clientMutationId: cmid(),
  taskId,
  baseVersion,
  changes: { title },
})

beforeEach(() => {
  store = createSeededStore()
})

describe('applyMutation: creating', () => {
  it('creates a task at version 1, owned by the actor, on the actor\'s board', () => {
    const result = applyMutation(store, bob, {
      type: 'task.create',
      clientMutationId: 'create-1',
      task: { id: 'new-1', title: 'Order pizza', description: '', column: 'todo', order: 10 },
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.ack).toMatchObject({ type: 'ack', clientMutationId: 'create-1', taskId: 'new-1' })
    expect(result.ack.task).toMatchObject({ version: 1, boardId: 'launch', createdBy: 'u-bob' })
    expect(result.broadcast).toMatchObject({ type: 'task.created', by: 'u-bob' })
    expect(store.getTask('new-1')?.title).toBe('Order pizza')
  })

  it('refuses a viewer', () => {
    const result = applyMutation(store, carol, {
      type: 'task.create',
      clientMutationId: cmid(),
      task: { id: 'new-2', title: 'Sneaky', description: '', column: 'todo', order: 1 },
    })
    expect(result).toMatchObject({ ok: false, error: { type: 'error', code: 'FORBIDDEN' } })
    expect(store.getTask('new-2')).toBeUndefined()
  })
})

describe('applyMutation: permissions are checked on every message', () => {
  it('refuses a viewer who tries to update, move or delete', () => {
    const attempts: MutationMessage[] = [
      update('t-1', 1),
      { type: 'task.move', clientMutationId: cmid(), taskId: 't-1', baseVersion: 1, column: 'done', order: 1 },
      { type: 'task.delete', clientMutationId: cmid(), taskId: 't-1', baseVersion: 1 },
    ]
    for (const msg of attempts) {
      const result = applyMutation(store, carol, msg)
      expect(result).toMatchObject({ ok: false, error: { code: 'FORBIDDEN', clientMutationId: msg.clientMutationId } })
    }
    expect(store.getTask('t-1')).toMatchObject({ version: 1, column: 'todo' })
  })

  it('lets a member delete their own task but not someone else\'s', () => {
    const own = applyMutation(store, bob, { type: 'task.delete', clientMutationId: cmid(), taskId: 't-2', baseVersion: 1 })
    expect(own.ok).toBe(true)
    expect(store.getTask('t-2')).toBeUndefined()

    const other = applyMutation(store, bob, { type: 'task.delete', clientMutationId: cmid(), taskId: 't-1', baseVersion: 1 })
    expect(other).toMatchObject({ ok: false, error: { code: 'FORBIDDEN' } })
    expect(store.getTask('t-1')).toBeDefined()
  })

  it('uses the role as it is NOW, not as it was when the socket connected', () => {
    expect(applyMutation(store, bob, update('t-1', 1)).ok).toBe(true)
    store.setRole('launch', 'u-bob', 'viewer')
    expect(applyMutation(store, bob, update('t-1', 2))).toMatchObject({ ok: false, error: { code: 'FORBIDDEN' } })
    store.setRole('launch', 'u-bob', undefined)
    expect(applyMutation(store, bob, update('t-1', 2))).toMatchObject({ ok: false, error: { code: 'FORBIDDEN' } })
  })

  it('treats a task on another board as not found, even for an owner', () => {
    // t-5 lives on board "ops". Alice is owner of "launch", so her actor is scoped to "launch".
    const result = applyMutation(store, alice, update('t-5', 1))
    expect(result).toMatchObject({ ok: false, error: { code: 'NOT_FOUND', current: null } })
    expect(store.getTask('t-5')?.title).toBe('Rotate the on-call pager')
  })
})

describe('applyMutation: versions and conflicts', () => {
  it('bumps the version on every successful update and move', () => {
    const first = applyMutation(store, alice, update('t-1', 1, 'First'))
    expect(first.ok && first.ack.task?.version).toBe(2)
    const moved = applyMutation(store, alice, {
      type: 'task.move', clientMutationId: cmid(), taskId: 't-1', baseVersion: 2, column: 'doing', order: 99,
    })
    expect(moved.ok && moved.ack.task).toMatchObject({ version: 3, column: 'doing', order: 99, title: 'First' })
    expect(moved.ok && moved.broadcast).toMatchObject({ type: 'task.updated', by: 'u-alice' })
  })

  it('rejects a stale update with CONFLICT and returns the current task', () => {
    expect(applyMutation(store, alice, update('t-1', 1, 'Alice wins')).ok).toBe(true)

    const stale = update('t-1', 1, 'Bob loses')
    const result = applyMutation(store, bob, stale)
    expect(result).toMatchObject({
      ok: false,
      error: {
        type: 'error',
        code: 'CONFLICT',
        clientMutationId: stale.clientMutationId,
        current: { id: 't-1', title: 'Alice wins', version: 2 },
      },
    })
    expect(store.getTask('t-1')).toMatchObject({ title: 'Alice wins', version: 2 })
  })

  it('rejects a stale delete with CONFLICT and keeps the task', () => {
    applyMutation(store, alice, update('t-1', 1))
    const result = applyMutation(store, alice, { type: 'task.delete', clientMutationId: cmid(), taskId: 't-1', baseVersion: 1 })
    expect(result).toMatchObject({ ok: false, error: { code: 'CONFLICT', current: { version: 2 } } })
    expect(store.getTask('t-1')).toBeDefined()
  })

  it('reports NOT_FOUND with current: null when the task was deleted', () => {
    applyMutation(store, alice, { type: 'task.delete', clientMutationId: cmid(), taskId: 't-1', baseVersion: 1 })
    expect(applyMutation(store, bob, update('t-1', 1))).toMatchObject({ ok: false, error: { code: 'NOT_FOUND', current: null } })
  })

  it('treats a replayed clientMutationId as already done: same ack, no second change, no broadcast', () => {
    const msg = update('t-1', 1, 'Once')
    const first = applyMutation(store, alice, msg)
    const replay = applyMutation(store, alice, msg)
    expect(replay.ok).toBe(true)
    if (!first.ok || !replay.ok) return
    expect(replay.ack).toEqual(first.ack)
    expect(replay.broadcast).toBeNull()
    expect(store.getTask('t-1')?.version).toBe(2)
  })
})
