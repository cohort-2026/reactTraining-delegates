"use server";
// FIRST DRAFT: anyone who can reach this endpoint can change anyone's role.
import { revalidatePath } from "next/cache";
import type { ActionState } from "@/lib/action-state";
import { setUserRole } from "@/lib/db";
import type { Role } from "@/lib/types";

export async function changeRole(_prev: ActionState, formData: FormData): Promise<ActionState> {
  // TODO: session, can(user, "user:manage"), Zod, load the target user,
  // then can(user, "user:manage", { type: "user", id: target.id }).
  setUserRole(String(formData.get("userId")), formData.get("role") as Role);
  revalidatePath("/admin");
  return { error: null };
}
