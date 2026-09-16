"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { taskSchema, statusSchema } from "@/lib/schemas";
import type { Status } from "@/lib/types";

type State = { error: string | null };

export async function addTask(prev: State, formData: FormData): Promise<State> {
  const parsed = taskSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return { error: "Not signed in" };

  const { error } = await supabase.from("tasks").insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath("/");
  return { error: null };
}

export async function moveTask(id: string, status: Status) {
  const parsed = statusSchema.safeParse(status);
  if (!parsed.success) return;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return;

  await supabase.from("tasks").update({ status: parsed.data }).eq("id", id);
  revalidatePath("/");
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return;

  await supabase.from("tasks").delete().eq("id", id);
  revalidatePath("/");
}
