import type { LoginResponse } from '@taskboard/shared'
import { SERVER_URL } from '../config'

export type Session = LoginResponse

// sessionStorage, not localStorage: each tab keeps its own login, so you can
// be Alice in one window and Bob in another while testing.
const KEY = 'taskboard.session'

export function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function saveSession(session: Session) {
  sessionStorage.setItem(KEY, JSON.stringify(session))
}

export function clearSession() {
  sessionStorage.removeItem(KEY)
}

export async function login(username: string, password: string): Promise<Session> {
  let res: Response
  try {
    res = await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  } catch {
    throw new Error('Could not reach the server. Is `npm run dev` running?')
  }
  const body = (await res.json().catch(() => ({}))) as Partial<LoginResponse> & { error?: string }
  if (!res.ok || !body.token) {
    throw new Error(body.error ?? `Login failed (${res.status}).`)
  }
  return body as Session
}
