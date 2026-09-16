// Part of the offline stand-in for Supabase. You do not need to change this folder.
// Sessions are stored in a cookie as "<payload>.<signature>", like a real JWT.
// The signature below is a simple hash, NOT real cryptography.

export const AUTH_COOKIE = "sb-taskboard-auth-token";

const SIGNING_SECRET = "fake-project-signing-secret";

export type Claims = { sub: string; email: string };

function sign(payload: string): string {
  let hash = 0x811c9dc5;
  const text = payload + SIGNING_SECRET;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

function toBase64Url(text: string): string {
  return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): string {
  return atob(text.replace(/-/g, "+").replace(/_/g, "/"));
}

export function encodeSession(claims: Claims): string {
  const payload = toBase64Url(JSON.stringify(claims));
  return `${payload}.${sign(payload)}`;
}

export function signatureOf(token: string): string {
  return token.split(".")[1] ?? "";
}

export function payloadToken(claims: Claims, signature: string): string {
  return `${toBase64Url(JSON.stringify(claims))}.${signature}`;
}

/** Reads the claims WITHOUT checking the signature. */
export function decodeUnverified(token: string | undefined): Claims | null {
  if (!token) return null;
  try {
    const [payload] = token.split(".");
    const claims = JSON.parse(fromBase64Url(payload)) as Claims;
    return claims.sub && claims.email ? claims : null;
  } catch {
    return null;
  }
}

/** Reads the claims only if the signature is valid. */
export function verifySession(token: string | undefined): Claims | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || signature !== sign(payload)) return null;
  return decodeUnverified(token);
}
