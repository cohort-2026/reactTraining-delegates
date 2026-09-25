import { describe, expect, it } from "vitest";
import { login, logout } from "./actions";
import { ERRORS, initialState } from "@/lib/action-state";
import { DEMO_PASSWORD } from "@/lib/demo-users";
import { setUserRole } from "@/lib/db";
import { verifySessionToken } from "@/lib/session";
import { RedirectError, cookieJar } from "@/test/next-mocks";
import { COOKIE_NAME, USERS, form, signInAs } from "@/test/tokens";

/** Runs the login action and returns where it redirected to, or its state. */
async function tryLogin(fields: Record<string, string>) {
  try {
    return { state: await login(initialState, form(fields)), redirectedTo: null };
  } catch (error) {
    if (error instanceof RedirectError) return { state: null, redirectedTo: error.url };
    throw error;
  }
}

async function sessionUser() {
  return verifySessionToken(cookieJar.get(COOKIE_NAME)?.value);
}

describe("login", () => {
  it("signs in with the right password and redirects to /board", async () => {
    const result = await tryLogin({ email: "editor@example.com", password: DEMO_PASSWORD });
    expect(result.redirectedTo).toBe("/board");
    expect(await sessionUser()).toEqual(USERS.editor);
  });

  it("accepts the email in any case", async () => {
    const result = await tryLogin({ email: "Admin@Example.com", password: DEMO_PASSWORD });
    expect(result.redirectedTo).toBe("/board");
    expect(await sessionUser()).toEqual(USERS.admin);
  });

  it("refuses a wrong password without setting a cookie", async () => {
    const result = await tryLogin({ email: "admin@example.com", password: "letmein" });
    expect(result.state).toEqual({ error: ERRORS.badLogin });
    expect(cookieJar.has(COOKIE_NAME)).toBe(false);
  });

  it("gives the same message for an unknown email", async () => {
    const result = await tryLogin({ email: "nobody@example.com", password: DEMO_PASSWORD });
    expect(result.state).toEqual({ error: ERRORS.badLogin });
    expect(cookieJar.has(COOKIE_NAME)).toBe(false);
  });

  it("ignores a role or user id sent with the form", async () => {
    await tryLogin({
      email: "viewer@example.com",
      password: DEMO_PASSWORD,
      role: "admin",
      id: "u-admin",
      userId: "u-admin",
    });
    expect(await sessionUser()).toEqual(USERS.viewer);
  });

  it("takes the role from the user store", async () => {
    setUserRole("u-viewer", "editor");
    await tryLogin({ email: "viewer@example.com", password: DEMO_PASSWORD });
    expect((await sessionUser())?.role).toBe("editor");
  });
});

describe("logout", () => {
  it("clears the session and redirects to /login", async () => {
    await signInAs(USERS.admin);
    await expect(logout()).rejects.toMatchObject({ url: "/login" });
    expect(cookieJar.has(COOKIE_NAME)).toBe(false);
  });
});
