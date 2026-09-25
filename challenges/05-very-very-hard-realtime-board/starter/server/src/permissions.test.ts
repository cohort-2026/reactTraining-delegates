import { describe, expect, it } from 'vitest'
import { can, type Action } from './permissions'

const EDITS: Action[] = ['task.create', 'task.update', 'task.move']
const mine = { createdBy: 'u-me' }
const theirs = { createdBy: 'u-someone-else' }

describe('can()', () => {
  it('lets an owner do everything, including deleting other people\'s tasks', () => {
    for (const action of EDITS) expect(can('owner', action, 'u-me', theirs)).toBe(true)
    expect(can('owner', 'task.delete', 'u-me', theirs)).toBe(true)
  })

  it('lets a member create, update and move any task', () => {
    expect(can('member', 'task.create', 'u-me')).toBe(true)
    expect(can('member', 'task.update', 'u-me', theirs)).toBe(true)
    expect(can('member', 'task.move', 'u-me', theirs)).toBe(true)
  })

  it('lets a member delete only the tasks they created', () => {
    expect(can('member', 'task.delete', 'u-me', mine)).toBe(true)
    expect(can('member', 'task.delete', 'u-me', theirs)).toBe(false)
  })

  it('lets a viewer do nothing', () => {
    for (const action of [...EDITS, 'task.delete' as const]) {
      expect(can('viewer', action, 'u-me', mine)).toBe(false)
    }
  })

  it('denies everything to someone with no role on the board', () => {
    for (const action of [...EDITS, 'task.delete' as const]) {
      expect(can(undefined, action, 'u-me', mine)).toBe(false)
    }
  })
})
