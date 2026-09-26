import { beforeEach, describe, expect, it, vi } from "vitest";
import { addTask } from "./actions";
import { listTasksFor, resetFakeDatabase } from "@/lib/fake-supabase/db";
import { editedSessionCookie, sessionCookieFor } from "@/lib/fake-supabase/testing";

// A fake cookie jar stands in for the browser's cookies.
const cookieJar = vi.hoisted(() => new Map<string, string>());

vi.mock("next/headers", () => ({
  cookies: async () => ({
    getAll: () => [...cookieJar].map(([name, value]) => ({ name, value })),
    set: (name: string, value: string) => {
      cookieJar.set(name, value);
    },
  }),
}));

// Next.js caching helpers only work inside a running Next.js app.
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

function taskForm(title: string) {
  const formData = new FormData();
  formData.set("title", title);
  formData.set("status", "todo");
  formData.set("points", "1");
  return formData;
}

beforeEach(() => {
  cookieJar.clear();
  resetFakeDatabase();
});

describe("addTask", () => {
  it("saves a task for the signed-in user", async () => {
    cookieJar.set(...sessionCookieFor("alice@example.com"));

    const state = await addTask({ error: null }, taskForm("Write the tests"));

    expect(state).toEqual({ error: null });
    expect(listTasksFor("alice@example.com").map((t) => t.title))
      .toContain("Write the tests");
  });

  it("rejects a title that is too short", async () => {
    cookieJar.set(...sessionCookieFor("alice@example.com"));

    const state = await addTask({ error: null }, taskForm("ab"));

    expect(state).toEqual({ error: "Invalid task" });
  });

  it("refuses when nobody is signed in", async () => {
    const state = await addTask({ error: null }, taskForm("Sneaky task"));

    expect(state).toEqual({ error: "Not signed in" });
  });

  it("refuses a session cookie that has been edited by hand", async () => {
    cookieJar.set(...editedSessionCookie());

    const state = await addTask({ error: null }, taskForm("Sneaky task"));

    expect(state).toEqual({ error: "Not signed in" });
    expect(listTasksFor("bob@example.com").map((t) => t.title))
      .not.toContain("Sneaky task");
  });
});
