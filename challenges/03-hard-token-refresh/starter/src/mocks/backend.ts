// The fake auth server's state. The MSW handlers in handlers.ts call into this
// module, and the tests use `mockBackend` to control it (expire tokens, revoke
// sessions, count refresh calls).
//
// YOUR APP CODE MUST NOT IMPORT THIS FILE. In a real app this lives on a server
// you cannot reach from the browser. (The DevTools panel is the one exception:
// it is a teaching aid for poking the fake server by hand.)
import type { Task, User } from "../types";

export const DEMO_USER: User = { id: "u1", name: "Dana Demo", email: "demo@taskboard.dev" };
export const DEMO_PASSWORD = "password123";

export const REFRESH_COOKIE = "refresh_token";

type SessionRecord = {
  id: string;
  userId: string;
  /** The only refresh token that is valid for this session right now. */
  currentRefreshToken: string;
  revoked: boolean;
};

type AccessTokenRecord = {
  sessionId: string;
  expiresAt: number;
};

type Stats = {
  loginCalls: number;
  refreshCalls: number;
  logoutCalls: number;
  taskRequests: number;
};

const seedTasks: Task[] = [
  { id: "1", title: "Plan sprint", done: false },
  { id: "2", title: "Write report", done: false },
  { id: "3", title: "Book room", done: true },
];

function emptyStats(): Stats {
  return { loginCalls: 0, refreshCalls: 0, logoutCalls: 0, taskRequests: 0 };
}

const state = {
  accessTokenTtlMs: 10_000,
  refreshDelayMs: 0,
  sessions: new Map<string, SessionRecord>(),
  accessTokens: new Map<string, AccessTokenRecord>(),
  /** Every refresh token ever issued, mapped to its session. Used to spot reuse. */
  refreshTokens: new Map<string, string>(),
  /**
   * Stands in for the browser's cookie store. A real server would send
   * `Set-Cookie: refresh_token=...; HttpOnly; Secure; SameSite=Strict`, and the
   * browser would attach it to /api/auth/* requests without JavaScript ever seeing it.
   */
  cookies: new Map<string, string>(),
  nextRefreshFailure: null as number | null,
  tasks: seedTasks.map((t) => ({ ...t })),
  nextTaskId: 100,
  stats: emptyStats(),
};

const randomToken = (prefix: string) => `${prefix}_${crypto.randomUUID()}`;

// ---------------------------------------------------------------------------
// Used by the handlers
// ---------------------------------------------------------------------------

export function issueAccessToken(sessionId: string) {
  const token = randomToken("at");
  state.accessTokens.set(token, { sessionId, expiresAt: Date.now() + state.accessTokenTtlMs });
  return { accessToken: token, expiresIn: Math.round(state.accessTokenTtlMs / 1000) };
}

export function issueRefreshToken(session: SessionRecord) {
  const token = randomToken("rt");
  session.currentRefreshToken = token;
  state.refreshTokens.set(token, session.id);
  state.cookies.set(REFRESH_COOKIE, token);
}

export function createSession(user: User) {
  const session: SessionRecord = {
    id: crypto.randomUUID(),
    userId: user.id,
    currentRefreshToken: "",
    revoked: false,
  };
  state.sessions.set(session.id, session);
  issueRefreshToken(session);
  return session;
}

export type AccessCheck =
  | { ok: true; userId: string }
  | { ok: false; code: "missing_token" | "invalid_token" | "token_expired" };

export function checkAccessToken(authorization: string | null): AccessCheck {
  const match = authorization?.match(/^Bearer (.+)$/);
  if (!match) return { ok: false, code: "missing_token" };
  const record = state.accessTokens.get(match[1]);
  if (!record) return { ok: false, code: "invalid_token" };
  // Expiry is checked first, like a signed JWT: an expired token is "expired" even
  // if its session has since been revoked. The refresh is what finds that out.
  if (Date.now() >= record.expiresAt) return { ok: false, code: "token_expired" };
  const session = state.sessions.get(record.sessionId);
  if (!session || session.revoked) return { ok: false, code: "invalid_token" };
  return { ok: true, userId: session.userId };
}

export type RefreshResult =
  | { ok: true; accessToken: string; expiresIn: number }
  | { ok: false; status: number; code: string };

/** Rotates the refresh token in the cookie jar. An old token used twice revokes the session. */
export function rotateRefreshToken(): RefreshResult {
  state.stats.refreshCalls++;

  if (state.nextRefreshFailure !== null) {
    const status = state.nextRefreshFailure;
    state.nextRefreshFailure = null;
    return { ok: false, status, code: "server_error" };
  }

  const token = state.cookies.get(REFRESH_COOKIE);
  if (!token) return { ok: false, status: 401, code: "no_refresh_token" };

  const sessionId = state.refreshTokens.get(token);
  const session = sessionId ? state.sessions.get(sessionId) : undefined;
  if (!session) return { ok: false, status: 401, code: "invalid_refresh_token" };
  if (session.revoked) return { ok: false, status: 401, code: "session_revoked" };

  if (token !== session.currentRefreshToken) {
    // Someone presented a refresh token that was already rotated away. Either an
    // attacker stole it, or the client refreshed twice at once. Either way, kill
    // the whole session: this is "refresh token reuse detection".
    session.revoked = true;
    state.cookies.delete(REFRESH_COOKIE);
    return { ok: false, status: 401, code: "refresh_token_reused" };
  }

  issueRefreshToken(session);
  return { ok: true, ...issueAccessToken(session.id) };
}

export function endSessionFromCookie() {
  state.stats.logoutCalls++;
  const token = state.cookies.get(REFRESH_COOKIE);
  const sessionId = token ? state.refreshTokens.get(token) : undefined;
  const session = sessionId ? state.sessions.get(sessionId) : undefined;
  if (session) session.revoked = true;
  state.cookies.delete(REFRESH_COOKIE);
}

export function listTasks() {
  return state.tasks;
}

export function addTask(title: string) {
  const task: Task = { id: String(state.nextTaskId++), title, done: false };
  state.tasks.push(task);
  return task;
}

export function countCall(name: keyof Stats) {
  state.stats[name]++;
}

export function getRefreshDelayMs() {
  return state.refreshDelayMs;
}

// ---------------------------------------------------------------------------
// Controls for the tests and the DevTools panel
// ---------------------------------------------------------------------------

export const mockBackend = {
  /** Back to a clean server: no sessions, no cookie, default settings, counters at 0. */
  reset() {
    state.accessTokenTtlMs = 10_000;
    state.refreshDelayMs = 0;
    state.sessions.clear();
    state.accessTokens.clear();
    state.refreshTokens.clear();
    state.cookies.clear();
    state.nextRefreshFailure = null;
    state.tasks = seedTasks.map((t) => ({ ...t }));
    state.nextTaskId = 100;
    state.stats = emptyStats();
  },

  configure(options: { accessTokenTtlMs?: number; refreshDelayMs?: number }) {
    if (options.accessTokenTtlMs !== undefined) state.accessTokenTtlMs = options.accessTokenTtlMs;
    if (options.refreshDelayMs !== undefined) state.refreshDelayMs = options.refreshDelayMs;
  },

  /**
   * Signs the demo user in on the server side, exactly like a successful
   * POST /api/auth/login (sets the refresh cookie), and returns the body the
   * login endpoint would have returned.
   */
  signIn() {
    const session = createSession(DEMO_USER);
    return { ...issueAccessToken(session.id), user: DEMO_USER };
  },

  /** Every access token issued so far is now expired. Refresh tokens still work. */
  expireAccessTokens() {
    for (const record of state.accessTokens.values()) record.expiresAt = 0;
  },

  /** Every session is revoked, so the next refresh fails with 401. */
  revokeAllSessions() {
    for (const session of state.sessions.values()) session.revoked = true;
  },

  /** The next call to /api/auth/refresh answers with this status (default 500). */
  failNextRefresh(status = 500) {
    state.nextRefreshFailure = status;
  },

  activeSessionCount() {
    return [...state.sessions.values()].filter((s) => !s.revoked).length;
  },

  /** Read or overwrite the simulated refresh-token cookie (for replay tests). */
  getRefreshCookie() {
    return state.cookies.get(REFRESH_COOKIE) ?? null;
  },
  setRefreshCookie(value: string) {
    state.cookies.set(REFRESH_COOKIE, value);
  },

  get stats(): Readonly<Stats> {
    return { ...state.stats };
  },
};
