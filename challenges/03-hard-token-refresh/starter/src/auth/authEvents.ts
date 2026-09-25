// PROVIDED. A tiny event emitter for "the user has been signed out".
// authFetch and session.ts emit it; AuthProvider listens (to clear the query
// cache and show the login page). You should not need to change this file.

export type LogoutReason =
  /** The user clicked "Sign out" in this tab. */
  | "user"
  /** The refresh token was rejected, so the session is over. */
  | "session_expired"
  /** Another tab signed out and told us over BroadcastChannel. */
  | "remote";

type Listener = (reason: LogoutReason) => void;

const listeners = new Set<Listener>();

/** Subscribe to logouts. Returns an unsubscribe function (handy for useEffect cleanup). */
export function onLogout(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function emitLogout(reason: LogoutReason): void {
  for (const listener of [...listeners]) listener(reason);
}
