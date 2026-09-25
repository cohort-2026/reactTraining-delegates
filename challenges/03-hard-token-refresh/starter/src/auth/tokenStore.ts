// TODO: the in-memory session store.
//
// Holds the signed-in user and their ACCESS token. Rules:
// - Keep it in a module-level variable. Do NOT put the access token in
//   localStorage or sessionStorage (the tests check).
// - The refresh token never comes here: the server keeps it in a cookie that
//   JavaScript cannot read (see src/mocks/backend.ts and the README).
// - React needs to know when the session changes, so support subscribe(). The
//   shape of subscribe/getSession is exactly what useSyncExternalStore expects.
import type { User } from "../types";

export type Session = {
  accessToken: string;
  user: User;
};

/** The current session, or null when signed out. Must return the SAME object until it changes. */
export function getSession(): Session | null {
  // TODO
  return null;
}

/** Shortcut for getSession()?.accessToken ?? null. */
export function getAccessToken(): string | null {
  // TODO
  return null;
}

/** Called after a successful login. Notifies subscribers. */
export function setSession(session: Session): void {
  // TODO
  void session;
}

/** Called after a successful refresh: same user, new access token. Notifies subscribers. */
export function setAccessToken(accessToken: string): void {
  // TODO (hint: do nothing if nobody is signed in)
  void accessToken;
}

/** Forget everything. Notifies subscribers. Safe to call when already signed out. */
export function clearSession(): void {
  // TODO
}

/** Call `listener` whenever the session changes. Returns an unsubscribe function. */
export function subscribe(listener: () => void): () => void {
  // TODO
  void listener;
  return () => {};
}
