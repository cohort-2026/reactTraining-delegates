// A pretend web API, so this exercise works without an internet connection.
// There are no bugs in this file and you do not need to change it.
//
// It exports a function called `fetch` that behaves like the real fetch:
// it waits a moment, then resolves with a real Response object, so
// res.ok, res.status and res.json() all work exactly as in the handbook.
//
// Routes it understands:
//   /todos?_limit=N   the first N to-dos
//   /todos/ID         one to-do, or a 404 if there is no such id
//   /users/ID         one user, or a 404 if there is no such id
//   anything else     a 404

const todos = [
  { id: 1, title: "Set up project", completed: true, points: 2 },
  { id: 2, title: "Fix typo in README", completed: false, points: 0 },
  { id: 3, title: "Build task list", completed: false, points: 5 },
  { id: 4, title: "Design login page", completed: true, points: 3 },
  { id: 5, title: "Add search box", completed: false, points: null },
  { id: 6, title: "Write tests", completed: false, points: 8 },
];

const users = [
  { id: 1, name: "Lerato", address: { city: "Johannesburg" } },
  { id: 2, name: "Kagiso", address: null },
];

function reply(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function fetch(url) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  const { pathname, searchParams } = new URL(url);
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "todos" && parts.length === 1) {
    const limit = Number(searchParams.get("_limit") ?? todos.length);
    return reply(todos.slice(0, limit));
  }

  if (parts[0] === "todos" && parts.length === 2) {
    const todo = todos.find((t) => t.id === Number(parts[1]));
    return todo ? reply(todo) : reply({}, 404);
  }

  if (parts[0] === "users" && parts.length === 2) {
    const user = users.find((u) => u.id === Number(parts[1]));
    return user ? reply(user) : reply({}, 404);
  }

  return reply({}, 404);
}
