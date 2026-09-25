import { describe, expect, it } from 'vitest'
import { backoffDelay } from './backoff'

const max = () => 1 // jitter at the top of the range
const min = () => 0 // jitter at the bottom of the range

describe('backoffDelay', () => {
  it('doubles the ceiling with every attempt', () => {
    const delays = [0, 1, 2, 3, 4].map((attempt) => backoffDelay(attempt, { baseMs: 500, maxMs: 30_000, random: max }))
    expect(delays).toEqual([500, 1_000, 2_000, 4_000, 8_000])
  })

  it('never waits longer than maxMs, however many attempts', () => {
    expect(backoffDelay(10, { baseMs: 500, maxMs: 30_000, random: max })).toBe(30_000)
    expect(backoffDelay(5_000, { baseMs: 500, maxMs: 30_000, random: max })).toBe(30_000)
  })

  it('adds jitter: the delay falls in the upper half of the ceiling', () => {
    expect(backoffDelay(3, { baseMs: 500, maxMs: 30_000, random: min })).toBe(2_000)
    expect(backoffDelay(3, { baseMs: 500, maxMs: 30_000, random: () => 0.5 })).toBe(3_000)
    for (let i = 0; i < 50; i++) {
      const delay = backoffDelay(3, { baseMs: 500, maxMs: 30_000 })
      expect(delay).toBeGreaterThanOrEqual(2_000)
      expect(delay).toBeLessThanOrEqual(4_000)
    }
  })

  it('has sensible defaults', () => {
    const first = backoffDelay(0)
    expect(first).toBeGreaterThan(0)
    expect(first).toBeLessThanOrEqual(1_000)
    expect(backoffDelay(100)).toBeLessThanOrEqual(30_000)
  })
})
