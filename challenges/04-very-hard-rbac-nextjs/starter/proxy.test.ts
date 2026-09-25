import { NextRequest } from "next/server";
// The Next.js 16 docs call this helper unstable_doesProxyMatch, but in
// next@16.3.5 it is still exported under its old name.
import { getRedirectUrl, unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "./proxy";
import { COOKIE_NAME, FORGERIES, USERS, validToken } from "@/test/tokens";

const SITE = "http://localhost:3000";

function request(path: string, token?: string) {
  const headers: Record<string, string> = token ? { cookie: `${COOKIE_NAME}=${token}` } : {};
  return new NextRequest(`${SITE}${path}`, { headers });
}

/** The path the proxy redirected to, or null if it let the request through. */
async function redirectPath(path: string, token?: string) {
  const url = getRedirectUrl(await proxy(request(path, token)));
  return url && new URL(url).pathname;
}

describe("proxy matcher", () => {
  it.each(["/board", "/board/anything", "/admin", "/admin/users"])("runs on %s", (url) => {
    expect(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url })).toBe(true);
  });
});

describe("proxy", () => {
  it.each(["/board", "/admin"])("sends a signed-out visitor from %s to /login", async (path) => {
    expect(await redirectPath(path)).toBe("/login");
  });

  it.each(FORGERIES)("treats a cookie that is %s as signed out", async (_label, forge) => {
    expect(await redirectPath("/admin", await forge())).toBe("/login");
  });

  it.each([USERS.admin, USERS.editor, USERS.viewer])("lets $role through to /board", async (user) => {
    expect(await redirectPath("/board", await validToken(user))).toBeNull();
  });

  it.each([USERS.editor, USERS.viewer])("sends $role away from /admin to /board", async (user) => {
    expect(await redirectPath("/admin", await validToken(user))).toBe("/board");
  });

  it("lets an admin through to /admin", async () => {
    expect(await redirectPath("/admin", await validToken(USERS.admin))).toBeNull();
  });
});
