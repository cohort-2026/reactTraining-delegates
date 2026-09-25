// These tests call the Server Actions directly, the way an attacker would
// from DevTools or curl, without going through the UI or the proxy.
import { revalidatePath } from "next/cache";
import { describe, expect, it } from "vitest";
import { createTask, deleteTask, moveTask, updateTask } from "./actions";
import { ERRORS, initialState } from "@/lib/action-state";
import { getTask, listTasks } from "@/lib/db";
import { FORGERIES, USERS, form, setSessionCookie, signInAs } from "@/test/tokens";

// Seed data: t-1 and t-3 were created by the admin, t-2 and t-4 by the editor.
const ADMINS_TASK = "t-1";
const EDITORS_TASK = "t-2";

const titles = () => listTasks().map((t) => t.title);

describe("createTask", () => {
  it("refuses when nobody is signed in", async () => {
    const state = await createTask(initialState, form({ title: "Sneaky task" }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(titles()).not.toContain("Sneaky task");
  });

  it.each(FORGERIES)("refuses a session cookie that is %s", async (_label, forge) => {
    setSessionCookie(await forge());
    const state = await createTask(initialState, form({ title: "Sneaky task" }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(titles()).not.toContain("Sneaky task");
  });

  it("refuses a viewer, even though the viewer never saw the form", async () => {
    await signInAs(USERS.viewer);
    const state = await createTask(initialState, form({ title: "Viewer task" }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(titles()).not.toContain("Viewer task");
  });

  it("lets an editor create a task, owned by the editor", async () => {
    await signInAs(USERS.editor);
    const state = await createTask(initialState, form({ title: "Write the tests", status: "doing" }));

    expect(state).toEqual({ error: null });
    const task = listTasks().find((t) => t.title === "Write the tests");
    expect(task).toMatchObject({ status: "doing", createdBy: "u-editor" });
    expect(revalidatePath).toHaveBeenCalledWith("/board");
  });

  it("ignores a createdBy, userId or role sent by the client", async () => {
    await signInAs(USERS.editor);
    await createTask(
      initialState,
      form({ title: "Framed task", createdBy: "u-admin", userId: "u-admin", role: "admin" }),
    );
    expect(listTasks().find((t) => t.title === "Framed task")?.createdBy).toBe("u-editor");
  });

  it.each([
    ["too short", { title: "ab" }],
    ["only spaces", { title: "      " }],
    ["too long", { title: "x".repeat(121) }],
    ["an unknown status", { title: "Valid title", status: "archived" }],
    ["missing the title", {}],
  ])("rejects input that is %s", async (_label, fields: Record<string, string>) => {
    await signInAs(USERS.editor);
    const before = listTasks().length;
    const state = await createTask(initialState, form(fields));
    expect(state).toEqual({ error: ERRORS.invalid });
    expect(listTasks()).toHaveLength(before);
  });

  it("trims the title before saving it", async () => {
    await signInAs(USERS.admin);
    await createTask(initialState, form({ title: "   Padded title   " }));
    expect(titles()).toContain("Padded title");
  });
});

describe("updateTask", () => {
  it("refuses when nobody is signed in", async () => {
    const state = await updateTask(initialState, form({ id: ADMINS_TASK, title: "Hacked" }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(getTask(ADMINS_TASK)?.title).toBe("Plan the sprint");
  });

  it("refuses a viewer", async () => {
    await signInAs(USERS.viewer);
    const state = await updateTask(initialState, form({ id: ADMINS_TASK, title: "Hacked" }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(getTask(ADMINS_TASK)?.title).toBe("Plan the sprint");
  });

  it("lets an editor edit anyone's task", async () => {
    await signInAs(USERS.editor);
    const state = await updateTask(initialState, form({ id: ADMINS_TASK, title: "Plan the next sprint" }));
    expect(state).toEqual({ error: null });
    expect(getTask(ADMINS_TASK)?.title).toBe("Plan the next sprint");
  });

  it("does not let the client change the owner while editing", async () => {
    await signInAs(USERS.editor);
    await updateTask(initialState, form({ id: ADMINS_TASK, title: "Mine now", createdBy: "u-editor" }));
    expect(getTask(ADMINS_TASK)?.createdBy).toBe("u-admin");
  });

  it("rejects an invalid title", async () => {
    await signInAs(USERS.editor);
    const state = await updateTask(initialState, form({ id: ADMINS_TASK, title: "x" }));
    expect(state).toEqual({ error: ERRORS.invalid });
  });

  it("reports a task that does not exist", async () => {
    await signInAs(USERS.editor);
    const state = await updateTask(initialState, form({ id: "t-missing", title: "Ghost task" }));
    expect(state).toEqual({ error: ERRORS.notFound });
  });
});

describe("moveTask", () => {
  it("refuses a viewer", async () => {
    await signInAs(USERS.viewer);
    const state = await moveTask(initialState, form({ id: ADMINS_TASK, status: "done" }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(getTask(ADMINS_TASK)?.status).toBe("todo");
  });

  it.each(FORGERIES)("refuses a session cookie that is %s", async (_label, forge) => {
    setSessionCookie(await forge());
    const state = await moveTask(initialState, form({ id: ADMINS_TASK, status: "done" }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(getTask(ADMINS_TASK)?.status).toBe("todo");
  });

  it("lets an editor move anyone's task", async () => {
    await signInAs(USERS.editor);
    const state = await moveTask(initialState, form({ id: ADMINS_TASK, status: "done" }));
    expect(state).toEqual({ error: null });
    expect(getTask(ADMINS_TASK)?.status).toBe("done");
  });

  it("rejects a status that does not exist", async () => {
    await signInAs(USERS.editor);
    const state = await moveTask(initialState, form({ id: ADMINS_TASK, status: "archived" }));
    expect(state).toEqual({ error: ERRORS.invalid });
    expect(getTask(ADMINS_TASK)?.status).toBe("todo");
  });
});

describe("deleteTask", () => {
  it("refuses when nobody is signed in", async () => {
    const state = await deleteTask(initialState, form({ id: EDITORS_TASK }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(getTask(EDITORS_TASK)).toBeDefined();
  });

  it.each(FORGERIES)("refuses a session cookie that is %s", async (_label, forge) => {
    setSessionCookie(await forge());
    const state = await deleteTask(initialState, form({ id: EDITORS_TASK }));
    expect(state).toEqual({ error: ERRORS.notSignedIn });
    expect(getTask(EDITORS_TASK)).toBeDefined();
  });

  it("refuses a viewer", async () => {
    await signInAs(USERS.viewer);
    const state = await deleteTask(initialState, form({ id: EDITORS_TASK }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(getTask(EDITORS_TASK)).toBeDefined();
  });

  it("lets an editor delete a task they created", async () => {
    await signInAs(USERS.editor);
    const state = await deleteTask(initialState, form({ id: EDITORS_TASK }));
    expect(state).toEqual({ error: null });
    expect(getTask(EDITORS_TASK)).toBeUndefined();
  });

  it("refuses an editor deleting someone else's task", async () => {
    await signInAs(USERS.editor);
    const state = await deleteTask(initialState, form({ id: ADMINS_TASK }));
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(getTask(ADMINS_TASK)).toBeDefined();
  });

  it("reads the owner from the store, not from the request", async () => {
    await signInAs(USERS.editor);
    const state = await deleteTask(
      initialState,
      form({ id: ADMINS_TASK, createdBy: "u-editor", ownerId: "u-editor" }),
    );
    expect(state).toEqual({ error: ERRORS.forbidden });
    expect(getTask(ADMINS_TASK)).toBeDefined();
  });

  it("lets an admin delete anyone's task", async () => {
    await signInAs(USERS.admin);
    const state = await deleteTask(initialState, form({ id: EDITORS_TASK }));
    expect(state).toEqual({ error: null });
    expect(getTask(EDITORS_TASK)).toBeUndefined();
  });

  it("reports a task that does not exist", async () => {
    await signInAs(USERS.admin);
    const state = await deleteTask(initialState, form({ id: "t-missing" }));
    expect(state).toEqual({ error: ERRORS.notFound });
  });
});
