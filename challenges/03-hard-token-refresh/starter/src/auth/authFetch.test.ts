import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "../api/config";
import { mockBackend } from "../mocks/backend";
import { server } from "../mocks/node";
import type { Task } from "../types";
import { onLogout } from "./authEvents";
import { SessionExpiredError, authFetch, refreshAccessToken } from "./authFetch";
import { getAccessToken, getSession, setSession } from "./tokenStore";

const TASKS_URL = `${API_URL}/tasks`;

/** Signs in on the fake server and puts the session in the token store, like login() would. */
function signIn() {
  const { accessToken, user } = mockBackend.signIn();
  setSession({ accessToken, user });
  return accessToken;
}

const unsubscribers: Array<() => void> = [];
function logoutSpy() {
  const spy = vi.fn();
  unsubscribers.push(onLogout(spy));
  return spy;
}

afterEach(() => {
  unsubscribers.splice(0).forEach((off) => off());
  server.events.removeAllListeners();
});

describe("authFetch: attaching the access token", () => {
  it("sends the access token and does not refresh while it is still valid", async () => {
    signIn();

    const res = await authFetch(TASKS_URL);

    expect(res.status).toBe(200);
    const tasks = (await res.json()) as Task[];
    expect(tasks).toHaveLength(3);
    expect(mockBackend.stats.refreshCalls).toBe(0);
  });

  it("returns other 401s to the caller without refreshing", async () => {
    signIn();
    setSession({ accessToken: "at_not-a-real-token", user: getSession()!.user });

    const res = await authFetch(TASKS_URL);

    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ code: "invalid_token" });
    expect(mockBackend.stats.refreshCalls).toBe(0);
  });

  it("does not refresh or retry on errors that are not 401", async () => {
    signIn();

    const res = await authFetch(TASKS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" }),
    });

    expect(res.status).toBe(400);
    expect(mockBackend.stats.refreshCalls).toBe(0);
    expect(mockBackend.stats.taskRequests).toBe(1);
  });
});

describe("authFetch: refreshing an expired access token", () => {
  it("refreshes once and retries the request with the new token", async () => {
    const oldToken = signIn();
    mockBackend.expireAccessTokens();

    const res = await authFetch(TASKS_URL);

    expect(res.status).toBe(200);
    expect(mockBackend.stats.refreshCalls).toBe(1);
    expect(mockBackend.stats.taskRequests).toBe(2);
    expect(getAccessToken()).not.toBeNull();
    expect(getAccessToken()).not.toBe(oldToken);
  });

  it("retries a POST with the same method, body and headers", async () => {
    signIn();
    mockBackend.expireAccessTokens();
    const seen: Array<{ method: string; contentType: string | null; auth: string | null }> = [];
    server.events.on("request:start", ({ request }) => {
      if (request.url === TASKS_URL) {
        seen.push({
          method: request.method,
          contentType: request.headers.get("Content-Type"),
          auth: request.headers.get("Authorization"),
        });
      }
    });

    const res = await authFetch(TASKS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Ship it" }),
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ title: "Ship it" });
    expect(seen).toHaveLength(2);
    expect(seen.every((r) => r.method === "POST")).toBe(true);
    expect(seen.every((r) => r.contentType === "application/json")).toBe(true);
    expect(seen[0].auth).toMatch(/^Bearer at_/);
    expect(seen[1].auth).toMatch(/^Bearer at_/);
    expect(seen[1].auth).not.toBe(seen[0].auth);
  });

  it("does not loop forever when the retried request is rejected again", async () => {
    // Every access token the server issues is already expired.
    mockBackend.configure({ accessTokenTtlMs: 0 });
    signIn();
    // Safety net: if authFetch does loop, fail the 11th request with a network error
    // so this test fails quickly instead of hanging the whole test run.
    let attempts = 0;
    server.use(
      http.get(TASKS_URL, () => {
        attempts++;
        if (attempts > 10) return HttpResponse.error();
        // Returning nothing hands the request on to the normal handler.
      }),
    );

    const res = await authFetch(TASKS_URL);

    expect(res.status).toBe(401);
    expect(mockBackend.stats.refreshCalls).toBe(1);
    expect(mockBackend.stats.taskRequests).toBe(2);
  });
});

describe("single-flight refresh", () => {
  it("makes exactly ONE refresh call when five requests fail at the same time", async () => {
    signIn();
    mockBackend.expireAccessTokens();
    mockBackend.configure({ refreshDelayMs: 50 });

    const responses = await Promise.all(Array.from({ length: 5 }, () => authFetch(TASKS_URL)));

    expect(responses.map((r) => r.status)).toEqual([200, 200, 200, 200, 200]);
    expect(mockBackend.stats.refreshCalls).toBe(1);
    expect(mockBackend.stats.taskRequests).toBe(10);
    // Refreshing twice with the same refresh token would have revoked the session.
    expect(mockBackend.activeSessionCount()).toBe(1);
  });

  it("shares one refresh between callers, then allows a new one later", async () => {
    signIn();
    mockBackend.configure({ refreshDelayMs: 20 });

    const [a, b] = await Promise.all([refreshAccessToken(), refreshAccessToken()]);
    expect(a).toBe(b);
    expect(getAccessToken()).toBe(a);
    expect(mockBackend.stats.refreshCalls).toBe(1);

    const c = await refreshAccessToken();
    expect(c).not.toBe(a);
    expect(mockBackend.stats.refreshCalls).toBe(2);
  });

  it("does not remember a failed refresh: the next call tries again", async () => {
    signIn();
    mockBackend.failNextRefresh(500);

    await expect(refreshAccessToken()).rejects.toBeInstanceOf(SessionExpiredError);
    await expect(refreshAccessToken()).resolves.toMatch(/^at_/);
    expect(mockBackend.stats.refreshCalls).toBe(2);
  });
});

describe("when the refresh fails", () => {
  it("clears the session, signals logout once and rejects every waiting request", async () => {
    signIn();
    mockBackend.expireAccessTokens();
    mockBackend.revokeAllSessions();
    mockBackend.configure({ refreshDelayMs: 20 });
    const loggedOut = logoutSpy();

    const results = await Promise.allSettled([
      authFetch(TASKS_URL),
      authFetch(TASKS_URL),
      authFetch(TASKS_URL),
    ]);

    for (const result of results) {
      expect(result.status).toBe("rejected");
      expect((result as PromiseRejectedResult).reason).toBeInstanceOf(SessionExpiredError);
    }
    expect(mockBackend.stats.refreshCalls).toBe(1);
    expect(getSession()).toBeNull();
    expect(loggedOut).toHaveBeenCalledTimes(1);
    expect(loggedOut).toHaveBeenCalledWith("session_expired");
  });

  it("never retries the refresh request itself", async () => {
    signIn();
    mockBackend.expireAccessTokens();
    mockBackend.failNextRefresh(500);
    const loggedOut = logoutSpy();

    await expect(authFetch(TASKS_URL)).rejects.toBeInstanceOf(SessionExpiredError);

    expect(mockBackend.stats.refreshCalls).toBe(1);
    // The original request is not retried either: there is no token to retry it with.
    expect(mockBackend.stats.taskRequests).toBe(1);
    expect(loggedOut).toHaveBeenCalledWith("session_expired");
  });
});
