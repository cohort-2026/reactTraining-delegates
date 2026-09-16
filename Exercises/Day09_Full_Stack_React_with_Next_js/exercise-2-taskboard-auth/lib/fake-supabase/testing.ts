// Helpers for the tests. You do not need to change this folder.
import { demoUsers } from "./db";
import { AUTH_COOKIE, encodeSession, payloadToken, signatureOf } from "./session";

/** A valid session cookie for one of the demo users. */
export function sessionCookieFor(email: string): [string, string] {
  const user = demoUsers.find((u) => u.email === email);
  if (!user) throw new Error(`No demo user ${email}`);
  return [AUTH_COOKIE, encodeSession({ sub: user.id, email: user.email })];
}

/** Alice's cookie, edited in DevTools to claim to be Bob. The signature no longer matches. */
export function editedSessionCookie(): [string, string] {
  const [, aliceToken] = sessionCookieFor("alice@example.com");
  const bob = demoUsers[1];
  return [AUTH_COOKIE, payloadToken({ sub: bob.id, email: bob.email }, signatureOf(aliceToken))];
}
