// Session helpers: sign, verify, store and clear the session cookie.
//
// The contract (the tests rely on it):
//   - The cookie is called "session" (SESSION_COOKIE).
//   - Its value is a JWT signed with HS256 using process.env.SESSION_SECRET
//     (encode the secret with new TextEncoder().encode(secret)).
//   - The JWT holds the user's id in `sub`, plus `name` and `role` claims,
//     and an expiry (`exp`).
//
// Use the `jose` package (SignJWT and jwtVerify). See README hints 1 and 2.
import { cookies } from "next/headers";
import type { SessionUser } from "@/lib/types";

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours, in seconds

/** Signs a JWT (HS256) holding the user's id, name and role. */
export async function createSessionToken(user: SessionUser): Promise<string> {
  // TODO: sign a JWT for this user with SignJWT from "jose".
  //   - protected header { alg: "HS256" }
  //   - subject = user.id, claims = name and role
  //   - issued-at and an expiry of SESSION_MAX_AGE seconds
  //   - throw a clear error if SESSION_SECRET is missing or shorter than 32 characters
  throw new Error(`TODO: createSessionToken for ${user.id}`);
}

/**
 * Returns the user if the token has a valid signature, has not expired and
 * carries well-formed claims. Returns null for anything else.
 */
export async function verifySessionToken(token: string | undefined): Promise<SessionUser | null> {
  // TODO: verify with jwtVerify from "jose". Pin the algorithm to HS256.
  // Then check the claims with a Zod schema (sub, name, role) before trusting them.
  // Any failure (bad signature, expired, malformed, unknown role) returns null.
  void token;
  return null;
}

/** Signs a session for the user and stores it in a cookie. */
export async function createSession(user: SessionUser): Promise<void> {
  // TODO: create a token and store it with (await cookies()).set(...).
  // Decide the cookie flags: HttpOnly? Secure? SameSite? path? maxAge?
  const cookieStore = await cookies();
  void cookieStore;
  throw new Error(`TODO: createSession for ${user.id}`);
}

/** The signed-in user, or null. Call this in every page, action and route. */
export async function getSession(): Promise<SessionUser | null> {
  // TODO: read the SESSION_COOKIE cookie and verify it.
  return null;
}

export async function deleteSession(): Promise<void> {
  // TODO: delete the session cookie.
}
