// A tiny in-memory data store that stands in for a real database.
// Data resets when the server restarts. This module does NO permission
// checks: it trusts whoever calls it, exactly like a database client would.
// Deciding whether a call is allowed is the job of the code that calls it.
import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { DEMO_PASSWORD, DEMO_USERS } from "@/lib/demo-users";
import type { Role, Task, TaskStatus, User } from "@/lib/types";

type StoredUser = User & { salt: string; passwordHash: Buffer };
type Store = { users: StoredUser[]; tasks: Task[] };

function hashPassword(password: string, salt: string): Buffer {
  return scryptSync(password, salt, 32);
}

// Hash the demo passwords once; scrypt is deliberately slow.
const SEED_USERS: StoredUser[] = DEMO_USERS.map((user) => {
  const salt = `demo-salt-${user.id}`;
  return { ...user, salt, passwordHash: hashPassword(DEMO_PASSWORD, salt) };
});

const SEED_TASKS: Task[] = [
  { id: "t-1", title: "Plan the sprint", status: "todo", createdBy: "u-admin", createdAt: "2026-09-01T09:00:00.000Z" },
  { id: "t-2", title: "Write release notes", status: "doing", createdBy: "u-editor", createdAt: "2026-09-01T09:05:00.000Z" },
  { id: "t-3", title: "Fix the login page", status: "done", createdBy: "u-admin", createdAt: "2026-09-01T09:10:00.000Z" },
  { id: "t-4", title: "Update the style guide", status: "todo", createdBy: "u-editor", createdAt: "2026-09-01T09:15:00.000Z" },
];

function seed(): Store {
  return {
    users: SEED_USERS.map((user) => ({ ...user })),
    tasks: SEED_TASKS.map((task) => ({ ...task })),
  };
}

// Keep the store on globalThis so it survives hot reloads in `next dev`.
const globalForStore = globalThis as typeof globalThis & { __taskboardStore?: Store };

function store(): Store {
  globalForStore.__taskboardStore ??= seed();
  return globalForStore.__taskboardStore;
}

function publicUser({ id, name, email, role }: StoredUser): User {
  return { id, name, email, role };
}

/** Puts the demo data back. Used by the tests. */
export function resetStore(): void {
  globalForStore.__taskboardStore = seed();
}

// ---- Users ---------------------------------------------------------------

export function listUsers(): User[] {
  return store().users.map(publicUser);
}

export function getUser(id: string): User | undefined {
  const user = store().users.find((u) => u.id === id);
  return user && publicUser(user);
}

export function setUserRole(id: string, role: Role): User | undefined {
  const user = store().users.find((u) => u.id === id);
  if (!user) return undefined;
  user.role = role;
  return publicUser(user);
}

/** Returns the user if the email and password match, otherwise null. */
export function verifyCredentials(email: string, password: string): User | null {
  const user = store().users.find((u) => u.email === email.toLowerCase());
  // Hash even when the email is unknown, so both failures take the same time.
  const hash = hashPassword(password, user?.salt ?? "no-such-user");
  if (!user || !timingSafeEqual(hash, user.passwordHash)) return null;
  return publicUser(user);
}

// ---- Tasks ---------------------------------------------------------------

export function listTasks(): Task[] {
  return store().tasks.map((task) => ({ ...task }));
}

export function getTask(id: string): Task | undefined {
  const task = store().tasks.find((t) => t.id === id);
  return task && { ...task };
}

export function insertTask(input: { title: string; status: TaskStatus; createdBy: string }): Task {
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    status: input.status,
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };
  store().tasks.push(task);
  return { ...task };
}

export function updateTask(
  id: string,
  changes: Partial<Pick<Task, "title" | "status">>,
): Task | undefined {
  const task = store().tasks.find((t) => t.id === id);
  if (!task) return undefined;
  Object.assign(task, changes);
  return { ...task };
}

export function removeTask(id: string): boolean {
  const tasks = store().tasks;
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
