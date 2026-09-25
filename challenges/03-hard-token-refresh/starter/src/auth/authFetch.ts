// TODO: the heart of the challenge.
//
// authFetch(url, init) works like fetch, but:
//  1. adds `Authorization: Bearer <access token>` (keep any headers the caller passed);
//  2. if the response is 401 with body { code: "token_expired" }, refreshes the
//     access token and retries the ORIGINAL request (same method, body, headers)
//     ONCE with the new token;
//  3. if the refresh fails, clears the session, emits a "session_expired" logout
//     (see authEvents.ts) and rejects with SessionExpiredError;
//  4. any other response (including a second 401) goes back to the caller as-is.
//
// refreshAccessToken() calls POST /api/auth/refresh. It must be SINGLE-FLIGHT:
// while one refresh is in progress, every other caller gets the same promise.
// Never send the refresh request through authFetch itself, and never retry it.
import { API_URL } from "../api/config";

/** Thrown by authFetch and refreshAccessToken when the session cannot be renewed. */
export class SessionExpiredError extends Error {
  constructor(message = "Your session has expired") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

export const REFRESH_URL = `${API_URL}/auth/refresh`;

/** Gets a new access token from the server, stores it, and resolves with it. */
export async function refreshAccessToken(): Promise<string> {
  // TODO
  throw new Error("TODO: implement refreshAccessToken");
}

export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  // TODO: replace this line. Right now it is plain fetch with no token at all.
  return fetch(input, init);
}
