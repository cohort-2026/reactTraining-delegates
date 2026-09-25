// A pretend auth server. It behaves like a real one from the app's point of
// view: every call is asynchronous, and the "session cookie" lives in
// localStorage so it survives a page refresh. You do not need to change this file.

import type { Session, User } from "../auth/types";

const SESSION_KEY = "taskboard.session";
const SESSION_LENGTH_MS = 60 * 60 * 1000; // one hour

// Demo accounts. Every account uses the password "taskboard".
const users: User[] = [
  { id: "u1", name: "Ada Lovelace", email: "ada@taskboard.dev" },
  { id: "u2", name: "Grace Hopper", email: "grace@taskboard.dev" },
];
const DEMO_PASSWORD = "taskboard";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

/** Checks the credentials and starts a new session. Rejects with an AuthError if they are wrong. */
export async function login(email: string, password: string): Promise<Session> {
  await delay(150);
  const user = users.find((u) => u.email === email.trim().toLowerCase());
  if (!user || password !== DEMO_PASSWORD) {
    throw new AuthError("Incorrect email or password.");
  }
  const session: Session = {
    user,
    token: crypto.randomUUID(),
    expiresAt: Date.now() + SESSION_LENGTH_MS,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/** Returns the current session, or null if there is none or it has expired. */
export async function getSession(): Promise<Session | null> {
  await delay(100);
  const session = readSession();
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return session;
}

/** Ends the current session. */
export async function logout(): Promise<void> {
  await delay(50);
  localStorage.removeItem(SESSION_KEY);
}
