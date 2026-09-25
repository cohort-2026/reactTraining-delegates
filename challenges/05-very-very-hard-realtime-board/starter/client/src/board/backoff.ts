export interface BackoffOptions {
  /** Delay ceiling for the first retry, in ms. */
  baseMs?: number
  /** Never wait longer than this, in ms. */
  maxMs?: number
  /** Injected so tests can make the jitter predictable. */
  random?: () => number
}

/**
 * How long to wait before reconnect attempt number `attempt` (0, 1, 2, ...).
 *
 * Exponential: the ceiling doubles each time (500, 1000, 2000, ...) up to `maxMs`.
 * Jitter: the real delay is a random point in the upper half of the ceiling, so
 * a hundred clients that lost the server at the same moment do not all come
 * back at the same moment ("thundering herd").
 */
export function backoffDelay(
  _attempt: number,
  { baseMs = 500 }: BackoffOptions = {},
): number {
  // TODO (milestone 6): exponential ceiling, capped at maxMs, with jitter in the upper half.
  return baseMs
}
