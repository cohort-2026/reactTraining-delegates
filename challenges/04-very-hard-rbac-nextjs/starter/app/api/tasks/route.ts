// FIRST DRAFT: a JSON API for tasks with no checks at all.
import { insertTask, listTasks } from "@/lib/db";
import type { TaskStatus } from "@/lib/types";

export async function GET() {
  // TODO: 401 when not signed in; 403 when the policy says no.
  return Response.json({ tasks: listTasks() });
}

export async function POST(request: Request) {
  // TODO, in this order:
  //   1. isSameOrigin(request) or 403 { error: ERRORS.crossSite }
  //      (route handlers do NOT get the Origin check that Server Actions get)
  //   2. session or 401, then can() or 403
  //   3. parse the JSON body (400 if it is not JSON) and validate with Zod (400)
  //   4. insert with createdBy taken from the session, return 201 { task }
  const body = await request.json();
  const task = insertTask({
    title: String(body.title),
    status: (body.status ?? "todo") as TaskStatus,
    createdBy: String(body.createdBy ?? "unknown"),
  });
  return Response.json({ task }, { status: 201 });
}
