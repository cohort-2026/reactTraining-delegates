import type { createClient } from "@/lib/supabase/server";

type ServerClient = Awaited<ReturnType<typeof createClient>>;

export type CurrentUser = { id: string; email: string };

export async function getCurrentUser(
  supabase: ServerClient): Promise<CurrentUser | null> {
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return null;
  return { id: data.claims.sub, email: data.claims.email };
}
