// In a real project this import is: import { createBrowserClient } from "@supabase/ssr";
import { createBrowserClient } from "@/lib/fake-supabase/browser";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
  );
}
