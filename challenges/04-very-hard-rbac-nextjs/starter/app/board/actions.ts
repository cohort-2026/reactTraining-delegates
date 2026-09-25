"use server";
// FIRST DRAFT. These actions work, but they check nothing: no session, no
// permissions, no validation, and they believe whatever the client sends.
// Server Actions are public endpoints, so every one of them must:
//   1. get the session (getSession) -> { error: ERRORS.notSignedIn }
//   2. validate the input with Zod  -> { error: ERRORS.invalid }
//   3. load the task, if there is one -> { error: ERRORS.notFound }
//   4. ask can(user, action, resource) -> { error: ERRORS.forbidden }
//   5. only then change the data, then revalidatePath("/board")
import { revalidatePath } from "next/cache";
import type { ActionState } from "@/lib/action-state";
import { insertTask, removeTask, updateTask as saveTask } from "@/lib/db";
import type { TaskStatus } from "@/lib/types";

const ok: ActionState = { error: null };

export async function createTask(_prev: ActionState, formData: FormData): Promise<ActionState> {
  // TODO: session, can(), Zod. And never take the owner from the form.
  insertTask({
    title: String(formData.get("title")),
    status: (formData.get("status") ?? "todo") as TaskStatus,
    createdBy: String(formData.get("createdBy") ?? "unknown"),
  });
  revalidatePath("/board");
  return ok;
}

export async function updateTask(_prev: ActionState, formData: FormData): Promise<ActionState> {
  // TODO: session, Zod, load the task, can().
  saveTask(String(formData.get("id")), { title: String(formData.get("title")) });
  revalidatePath("/board");
  return ok;
}

export async function moveTask(_prev: ActionState, formData: FormData): Promise<ActionState> {
  // TODO: session, Zod, load the task, can().
  saveTask(String(formData.get("id")), { status: formData.get("status") as TaskStatus });
  revalidatePath("/board");
  return ok;
}

export async function deleteTask(_prev: ActionState, formData: FormData): Promise<ActionState> {
  // TODO: session, Zod, load the task, can() with the owner from the STORE.
  removeTask(String(formData.get("id")));
  revalidatePath("/board");
  return ok;
}
