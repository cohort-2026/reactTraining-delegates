import { jwtVerify } from "jose";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSession,
  createSessionToken,
  deleteSession,
  getSession,
  verifySessionToken,
} from "@/lib/session";
import { cookieJar } from "@/test/next-mocks";
import { COOKIE_NAME, FORGERIES, USERS, setSessionCookie, signInAs, validToken } from "@/test/tokens";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("createSessionToken", () => {
  it("signs an HS256 JWT with the user's id, name and role, and an expiry", async () => {
    const token = await createSessionToken(USERS.editor);
    const { payload, protectedHeader } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SESSION_SECRET),
      { algorithms: ["HS256"] },
    );

    expect(protectedHeader.alg).toBe("HS256");
    expect(payload).toMatchObject({ sub: "u-editor", name: "Eddie Editor", role: "editor" });
    expect(payload.exp).toBeTypeOf("number");
    // A session should not live forever: at most a week.
    expect(payload.exp! - Math.floor(Date.now() / 1000)).toBeLessThanOrEqual(7 * 24 * 60 * 60);
  });

  it("does not put a password or email in the token", async () => {
    const token = await createSessionToken(USERS.admin);
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
    for (const secret of ["password", "passwordHash", "email", "salt"]) {
      expect(payload).not.toHaveProperty(secret);
    }
  });
});

describe("verifySessionToken", () => {
  it("returns the user for a genuine token", async () => {
    expect(await verifySessionToken(await validToken(USERS.viewer))).toEqual(USERS.viewer);
  });

  it("round-trips a token made by createSessionToken", async () => {
    expect(await verifySessionToken(await createSessionToken(USERS.admin))).toEqual(USERS.admin);
  });

  it.each([undefined, ""])("returns null for a missing token (%j)", async (token) => {
    expect(await verifySessionToken(token)).toBeNull();
  });

  it.each(FORGERIES)("rejects a token that is %s", async (_label, forge) => {
    expect(await verifySessionToken(await forge())).toBeNull();
  });

  it("rejects a correctly signed token whose role is not a real role", async () => {
    const token = await validToken(USERS.admin, { claims: { role: "superadmin" } });
    expect(await verifySessionToken(token)).toBeNull();
  });

  it("rejects a correctly signed token with no subject", async () => {
    const token = await validToken({ id: "", name: "Nobody", role: "admin" });
    expect(await verifySessionToken(token)).toBeNull();
  });
});

describe("session cookie", () => {
  it("createSession stores the token in an HttpOnly, SameSite=Lax cookie for the whole site", async () => {
    await createSession(USERS.editor);

    const cookie = cookieJar.get(COOKIE_NAME);
    expect(cookie).toBeDefined();
    expect(cookie!.options.httpOnly).toBe(true);
    expect(String(cookie!.options.sameSite).toLowerCase()).toBe("lax");
    expect(cookie!.options.path).toBe("/");
    expect(await verifySessionToken(cookie!.value)).toEqual(USERS.editor);
  });

  it("is not marked Secure in development, so it works on http://localhost", async () => {
    vi.stubEnv("NODE_ENV", "development");
    await createSession(USERS.editor);
    expect(cookieJar.get(COOKIE_NAME)!.options.secure).toBeFalsy();
  });

  it("is marked Secure in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await createSession(USERS.editor);
    expect(cookieJar.get(COOKIE_NAME)!.options.secure).toBe(true);
  });

  it("getSession reads and verifies the cookie", async () => {
    expect(await getSession()).toBeNull();
    await signInAs(USERS.viewer);
    expect(await getSession()).toEqual(USERS.viewer);
  });

  it.each(FORGERIES)("getSession ignores a cookie that is %s", async (_label, forge) => {
    setSessionCookie(await forge());
    expect(await getSession()).toBeNull();
  });

  it("deleteSession removes the cookie", async () => {
    await signInAs(USERS.admin);
    await deleteSession();
    expect(cookieJar.has(COOKIE_NAME)).toBe(false);
    expect(await getSession()).toBeNull();
  });
});
