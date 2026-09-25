"use server";
import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/action-state";

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  // TODO:
  //   1. Validate the form with a Zod schema.
  //   2. Check the email and password with verifyCredentials() from lib/db.
  //   3. On failure return { error: ERRORS.badLogin } (one message for every failure).
  //   4. On success create the session (role from the store, never the form)
  //      and redirect("/board").
  void formData;
  return { error: "TODO: login is not implemented yet" };
}

export async function logout(): Promise<void> {
  // TODO: delete the session cookie before redirecting.
  redirect("/login");
}
