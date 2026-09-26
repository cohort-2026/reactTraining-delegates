import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// A server-side Supabase client for Server Components, Server Actions and
// Route Handlers. It reads and writes the auth session through Next.js
// cookies. Create a new one per request: never store this in a
// module-level variable, or one user's session would leak to everyone.
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options));
          } catch {
            // Called from a Server Component, which cannot set cookies.
            // The proxy refreshes the session instead.
          }
        },
      },
    },
  );
}
