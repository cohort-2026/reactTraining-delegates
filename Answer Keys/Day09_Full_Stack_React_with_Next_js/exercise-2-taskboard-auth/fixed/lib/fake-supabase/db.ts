// Part of the offline stand-in for Supabase. You do not need to change this folder.
// An in-memory "tasks" table that behaves like the Row Level Security policy
// in the course handbook: each user only sees and inserts their own rows.

export type Status = "todo" | "doing" | "done";

export type TaskRow = {
  id: string;
  user_id: string;
  title: string;
  status: Status;
  points: number;
  created_at: string;
};

export const demoUsers = [
  { id: "a1f0c1de-0000-4000-8000-000000000001", email: "alice@example.com", password: "password123" },
  { id: "b2e0c2de-0000-4000-8000-000000000002", email: "bob@example.com", password: "password123" },
];

type Store = { rows: TaskRow[]; nextId: number };

const globalStore = globalThis as typeof globalThis & { __fakeTasks?: Store };

function seed(): Store {
  return {
    nextId: 3,
    rows: [
      { id: "1", user_id: demoUsers[0].id, title: "Plan the sprint", status: "todo", points: 3, created_at: "2026-09-01T09:00:00Z" },
      { id: "2", user_id: demoUsers[1].id, title: "Fix the login page", status: "doing", points: 2, created_at: "2026-09-01T10:00:00Z" },
    ],
  };
}

function store(): Store {
  globalStore.__fakeTasks ??= seed();
  return globalStore.__fakeTasks;
}

export function resetFakeDatabase() {
  globalStore.__fakeTasks = seed();
}

export function rowsForUser(userId: string): TaskRow[] {
  return store()
    .rows.filter((row) => row.user_id === userId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export function insertRow(userId: string, values: { title: string; status: Status; points: number }) {
  const s = store();
  s.rows.push({
    id: String(s.nextId++),
    user_id: userId,
    title: values.title,
    status: values.status,
    points: values.points,
    created_at: new Date().toISOString(),
  });
}

export function listTasksFor(email: string): TaskRow[] {
  const user = demoUsers.find((u) => u.email === email);
  return user ? rowsForUser(user.id) : [];
}
