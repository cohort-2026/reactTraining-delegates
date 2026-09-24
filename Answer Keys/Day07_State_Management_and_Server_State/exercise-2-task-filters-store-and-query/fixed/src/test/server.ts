// A fake version of json-server for the tests, built with MSW (Mock Service Worker).
// It answers the same URLs as `npm run api`, so the tests do not need a real server.
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import type { Task } from "../types";

const API = "http://localhost:3001";

const seed: Task[] = [
  { id: "1", title: "Plan sprint", status: "todo", points: 3 },
  { id: "2", title: "Write report", status: "doing", points: 5 },
  { id: "3", title: "Book room", status: "done", points: 1 },
];

let tasks: Task[] = [];
let nextId = 100;

export function resetDb() {
  tasks = seed.map((t) => ({ ...t }));
  nextId = 100;
}

export const server = setupServer(
  http.get(`${API}/tasks`, ({ request }) => {
    const status = new URL(request.url).searchParams.get("status");
    return HttpResponse.json(status ? tasks.filter((t) => t.status === status) : tasks);
  }),
  http.post(`${API}/tasks`, async ({ request }) => {
    const body = (await request.json()) as Omit<Task, "id">;
    await delay(50);
    const task = { ...body, id: String(nextId++) };
    tasks.push(task);
    return HttpResponse.json(task, { status: 201 });
  }),
);

export function failNextSave() {
  server.use(
    http.post(
      `${API}/tasks`,
      () => HttpResponse.json({ error: "Database unavailable" }, { status: 500 }),
      { once: true },
    ),
  );
}
