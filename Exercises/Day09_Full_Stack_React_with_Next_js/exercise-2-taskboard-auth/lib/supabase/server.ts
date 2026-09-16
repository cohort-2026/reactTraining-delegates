// In a real project this import is: import { createServerClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/fake-supabase/server";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options));
          } catch { /* called from a Server Component */ }
        },
    } }
  );
}
