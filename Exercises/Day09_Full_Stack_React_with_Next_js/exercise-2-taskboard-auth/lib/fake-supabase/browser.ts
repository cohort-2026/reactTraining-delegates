// Offline stand-in for createBrowserClient from "@supabase/ssr".
// Like the real one, it keeps a single client per browser tab, and the key
// you pass in travels with every request it would make.
// You do not need to change this folder.
import { AUTH_COOKIE } from "./session";

type BrowserClient = {
  supabaseUrl: string;
  headers: { apikey: string };
  auth: { signOut: () => Promise<{ error: null }> };
};

let browserClient: BrowserClient | undefined;

export function createBrowserClient(supabaseUrl: string, supabaseKey: string) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "@supabase/ssr: Your project's URL and API key are required to create a Supabase client!"
    );
  }
  browserClient ??= {
    supabaseUrl,
    headers: { apikey: supabaseKey },
    auth: {
      async signOut() {
        document.cookie = `${AUTH_COOKIE}=; Max-Age=0; path=/`;
        return { error: null };
      },
    },
  };
  return browserClient;
}
