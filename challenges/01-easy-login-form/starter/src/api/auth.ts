import type { User } from '../types'

// A pretend auth server. There is no backend in this challenge: `login()`
// waits a moment, like a real network request, then succeeds for the demo
// account and fails for everything else. You do not need to change this file.

export const DEMO_EMAIL = 'demo@taskboard.dev'
export const DEMO_PASSWORD = 'Passw0rd!'
export const LOGIN_DELAY_MS = 800

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailMatches = email.trim().toLowerCase() === DEMO_EMAIL
      if (emailMatches && password === DEMO_PASSWORD) {
        resolve({ email: DEMO_EMAIL })
      } else {
        reject(new Error('Invalid email or password'))
      }
    }, LOGIN_DELAY_MS)
  })
}
