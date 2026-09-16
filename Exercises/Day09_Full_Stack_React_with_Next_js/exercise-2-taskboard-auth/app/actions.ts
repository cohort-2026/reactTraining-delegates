"use server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { taskSchema } from "@/lib/schemas";

type State = { error: string | null };

export async function addTask(
  formData: FormData): Promise<State> {
  const supabase = await createClient();
  const user = await getCurrentUser(supabase);
  if (!user) return { error: "Not signed in" };

  const parsed = taskSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid task" };

  const { error } = await supabase.from("tasks").insert(parsed.data);
  if (error) return { error: error.message };
  return { error: null };
}
