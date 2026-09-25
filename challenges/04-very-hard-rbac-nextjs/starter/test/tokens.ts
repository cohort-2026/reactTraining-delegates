// Helpers for building session tokens by hand: some genuine, some forged.
// They follow the contract in the README: an HS256 JWT signed with
// SESSION_SECRET, with the user id in `sub` plus `name` and `role` claims,
// stored in a cookie called "session".
import { SignJWT, UnsecuredJWT, decodeJwt } from "jose";
import type { Role, SessionUser } from "@/lib/types";
import { cookieJar } from "./next-mocks";

export const COOKIE_NAME = "session";

export const USERS = {
  admin: { id: "u-admin", name: "Ada Admin", role: "admin" },
  editor: { id: "u-editor", name: "Eddie Editor", role: "editor" },
  viewer: { id: "u-viewer", name: "Vera Viewer", role: "viewer" },
} as const satisfies Record<Role, SessionUser>;

function key(secret = process.env.SESSION_SECRET!) {
  return new TextEncoder().encode(secret);
}

/** A genuine token, exactly as the server should issue it. */
export async function validToken(
  user: SessionUser,
  options: { secret?: string; expiresAt?: number; claims?: Record<string, unknown> } = {},
): Promise<string> {
  return new SignJWT({ name: user.name, role: user.role, ...options.claims })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(options.expiresAt ?? "1h")
    .sign(key(options.secret));
}

/** A real viewer token whose payload was edited to say "admin". The signature no longer matches. */
export async function tamperedToken(): Promise<string> {
  const token = await validToken(USERS.viewer);
  const [header, , signature] = token.split(".");
  const payload = { ...decodeJwt(token), role: "admin" };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${encoded}.${signature}`;
}

/** An admin token signed with a secret the server does not know. */
export function wrongSecretToken(): Promise<string> {
  return validToken(USERS.admin, { secret: "an-attacker-guessed-this-secret-0123456789" });
}

/** An admin token with "alg": "none" and no signature at all. */
export function unsignedToken(): string {
  return new UnsecuredJWT({ name: USERS.admin.name, role: USERS.admin.role })
    .setSubject(USERS.admin.id)
    .setIssuedAt()
    .setExpirationTime("1h")
    .encode();
}

/** A correctly signed token that expired a minute ago. */
export function expiredToken(): Promise<string> {
  return validToken(USERS.admin, { expiresAt: Math.floor(Date.now() / 1000) - 60 });
}

/** Every way an attacker might try to forge a session. None should work. */
export const FORGERIES: Array<[string, () => Promise<string> | string]> = [
  ["payload edited by hand", tamperedToken],
  ["signed with the wrong secret", wrongSecretToken],
  ['"alg": "none" with no signature', unsignedToken],
  ["expired", expiredToken],
  ["not a JWT at all", () => "admin"],
];

/** Puts a session cookie for this user in the fake cookie jar. */
export async function signInAs(user: SessionUser): Promise<void> {
  cookieJar.set(COOKIE_NAME, { value: await validToken(user), options: {} });
}

/** Puts an arbitrary (possibly forged) session cookie in the fake cookie jar. */
export function setSessionCookie(value: string): void {
  cookieJar.set(COOKIE_NAME, { value, options: {} });
}

/** Builds a FormData from a plain object, the way a <form> would. */
export function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
}
