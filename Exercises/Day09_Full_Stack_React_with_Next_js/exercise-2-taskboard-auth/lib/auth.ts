import type { createClient } from "@/lib/supabase/server";

type ServerClient = Awaited<ReturnType<typeof createClient>>;

export type CurrentUser = { id: string; email: string };

export async function getCurrentUser(
  supabase: ServerClient): Promise<CurrentUser | null> {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;
  return { id: user.id, email: user.email };
}
