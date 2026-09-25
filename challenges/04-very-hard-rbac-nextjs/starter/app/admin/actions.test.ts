import { describe, expect, it } from "vitest";
import { changeRole } from "./actions";
import { ERRORS, initialState } from "@/lib/action-state";
import { getUser } from "@/lib/db";
import { FORGERIES, USERS, form, setSessionCookie, signInAs } from "@/test/tokens";

const roleOf = (id: string) => getUser(id)?.role;

describe("changeRole", () => {
  it("refuses when nobody is signed in", async () => {
    const state = await changeRole(initialState, form({ userId: "u-viewer", role: "admin" }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(roleOf("u-viewer")).toBe("viewer");
  });

  it.each(FORGERIES)("refuses a session cookie that is %s", async (_label, forge) => {
    setSessionCookie(await forge());
    const state = await changeRole(initialState, form({ userId: "u-viewer", role: "admin" }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(roleOf("u-viewer")).toBe("viewer");
  });

  it("stops a viewer promoting themselves to admin", async () => {
    await signInAs(USERS.viewer);
    const state = await changeRole(initialState, form({ userId: "u-viewer", role: "admin" }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(roleOf("u-viewer")).toBe("viewer");
  });

  it("refuses an editor", async () => {
    await signInAs(USERS.editor);
    const state = await changeRole(initialState, form({ userId: "u-viewer", role: "editor" }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(roleOf("u-viewer")).toBe("viewer");
  });

  it("lets an admin change another user's role", async () => {
    await signInAs(USERS.admin);
    const state = await changeRole(initialState, form({ userId: "u-viewer", role: "editor" }));
    expect(state).toEqual({ error: null });
    expect(roleOf("u-viewer")).toBe("editor");
  });

  it("stops an admin changing their own role", async () => {
    await signInAs(USERS.admin);
    const state = await changeRole(initialState, form({ userId: "u-admin", role: "viewer" }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(roleOf("u-admin")).toBe("admin");
  });

  it.each(["owner", "ADMIN", ""])("rejects the made-up role %j", async (role) => {
    await signInAs(USERS.admin);
    const state = await changeRole(initialState, form({ userId: "u-viewer", role }));
    expect(state).toEqual({ error: ERRORS.invalid });
    expect(roleOf("u-viewer")).toBe("viewer");
  });

  it("reports a user that does not exist", async () => {
    await signInAs(USERS.admin);
    const state = await changeRole(initialState, form({ userId: "u-ghost", role: "editor" }));
    expect(state).toEqual({ error: ERRORS.notFound });
  });
});
