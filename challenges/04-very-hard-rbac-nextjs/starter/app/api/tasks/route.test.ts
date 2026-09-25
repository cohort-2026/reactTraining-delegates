import { describe, expect, it } from "vitest";
import { GET, POST } from "./route";
import { ERRORS } from "@/lib/action-state";
import { listTasks } from "@/lib/db";
import { FORGERIES, USERS, setSessionCookie, signInAs } from "@/test/tokens";

const SITE = "http://localhost:3000";

function post(body: unknown, headers: Record<string, string> = { origin: SITE }) {
  return new Request(`${SITE}/api/tasks`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const titles = () => listTasks().map((t) => t.title);

describe("GET /api/tasks", () => {
  it("returns 401 when nobody is signed in", async () => {
    const response = await GET();
    expect(response.status).toBe(401);
  });

  it("lets a viewer read the tasks", async () => {
    await signInAs(USERS.viewer);
    const response = await GET();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.tasks).toHaveLength(4);
  });
});

describe("POST /api/tasks: CSRF", () => {
  it("returns 403 for a request from another site, even with a valid session", async () => {
    await signInAs(USERS.editor);
    const response = await POST(post({ title: "CSRF task" }, { origin: "https://evil.example" }));
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: ERRORS.crossSite });
    expect(titles()).not.toContain("CSRF task");
  });

  it("returns 403 for a request with no Origin header", async () => {
    await signInAs(USERS.editor);
    const response = await POST(post({ title: "CSRF task" }, {}));
    expect(response.status).toBe(403);
    expect(titles()).not.toContain("CSRF task");
  });

  it('returns 403 for Origin: null (sandboxed iframes, some redirects)', async () => {
    await signInAs(USERS.editor);
    const response = await POST(post({ title: "CSRF task" }, { origin: "null" }));
    expect(response.status).toBe(403);
  });

  it("returns 403 for a look-alike origin", async () => {
    await signInAs(USERS.editor);
    const response = await POST(post({ title: "CSRF task" }, { origin: "http://localhost:3000.evil.example" }));
    expect(response.status).toBe(403);
  });
});

describe("POST /api/tasks: authentication and authorisation", () => {
  it("returns 401 when nobody is signed in", async () => {
    const response = await POST(post({ title: "Anonymous task" }));
    expect(response.status).toBe(401);
    expect(titles()).not.toContain("Anonymous task");
  });

  it.each(FORGERIES)("returns 401 for a session cookie that is %s", async (_label, forge) => {
    setSessionCookie(await forge());
    const response = await POST(post({ title: "Forged task" }));
    expect(response.status).toBe(401);
    expect(titles()).not.toContain("Forged task");
  });

  it("returns 403 for a viewer", async () => {
    await signInAs(USERS.viewer);
    const response = await POST(post({ title: "Viewer task" }));
    expect(response.status).toBe(403);
    expect(titles()).not.toContain("Viewer task");
  });

  it("creates the task for an editor, owned by the editor", async () => {
    await signInAs(USERS.editor);
    const response = await POST(post({ title: "API task", createdBy: "u-admin", role: "admin" }));
    expect(response.status).toBe(201);
    const { task } = await response.json();
    expect(task).toMatchObject({ title: "API task", status: "todo", createdBy: "u-editor" });
    expect(listTasks().find((t) => t.title === "API task")?.createdBy).toBe("u-editor");
  });
});

describe("POST /api/tasks: validation", () => {
  it("returns 400 for an invalid task", async () => {
    await signInAs(USERS.editor);
    const response = await POST(post({ title: "ab" }));
    expect(response.status).toBe(400);
    expect(listTasks()).toHaveLength(4);
  });

  it("returns 400 for a body that is not JSON", async () => {
    await signInAs(USERS.editor);
    const response = await POST(post("{ not json"));
    expect(response.status).toBe(400);
  });
});
