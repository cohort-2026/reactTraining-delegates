// Offline stand-in for createServerClient from "@supabase/ssr".
// It has the same shape as the parts of the real client this app uses,
// so nothing here contacts the internet. You do not need to change this folder.
import { demoUsers, insertRow, rowsForUser, type Status } from "./db";
import { AUTH_COOKIE, decodeUnverified, encodeSession, verifySession } from "./session";

type CookieOptions = { path?: string; maxAge?: number; sameSite?: "lax" | "strict" | "none"; httpOnly?: boolean };
type CookieToSet = { name: string; value: string; options: CookieOptions };
type CookieMethods = {
  getAll: () => { name: string; value: string }[];
  setAll: (cookiesToSet: CookieToSet[], headers: Record<string, string>) => void;
};

type NewTask = { title: string; status: Status; points: number };

export function createServerClient(
  supabaseUrl: string,
  supabaseKey: string,
  options: { cookies: CookieMethods }
) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "@supabase/ssr: Your project's URL and API key are required to create a Supabase client!"
    );
  }

  const readToken = () =>
    options.cookies.getAll().find((cookie) => cookie.name === AUTH_COOKIE)?.value;

  return {
    auth: {
      async getClaims() {
        const claims = verifySession(readToken());
        return claims ? { data: { claims }, error: null } : { data: null, error: null };
      },

      async getSession() {
        const token = readToken();
        const claims = decodeUnverified(token);
        if (!token || !claims) return { data: { session: null }, error: null };
        const user = { id: claims.sub, email: claims.email };
        let warned = false;
        const session = {
          access_token: token,
          get user() {
            if (!warned) {
              warned = true;
              console.warn(
                "Using the user object as returned from supabase.auth.getSession() could be insecure! " +
                  "This value comes directly from the storage medium (usually cookies on the server) and may not be authentic."
              );
            }
            return user;
          },
        };
        return { data: { session }, error: null };
      },

      async signInWithPassword({ email, password }: { email: string; password: string }) {
        const user = demoUsers.find((u) => u.email === email && u.password === password);
        if (!user) {
          return { data: { user: null }, error: { message: "Invalid login credentials" } };
        }
        options.cookies.setAll(
          [
            {
              name: AUTH_COOKIE,
              value: encodeSession({ sub: user.id, email: user.email }),
              options: { path: "/", sameSite: "lax", maxAge: 60 * 60 },
            },
          ],
          {}
        );
        return { data: { user: { id: user.id, email: user.email } }, error: null };
      },

      async signOut() {
        options.cookies.setAll(
          [{ name: AUTH_COOKIE, value: "", options: { path: "/", maxAge: 0 } }],
          {}
        );
        return { error: null };
      },
    },

    // Like the real Data API, the database checks the signed token itself (RLS).
    from(table: "tasks") {
      if (table !== "tasks") throw new Error(`relation "public.${table}" does not exist`);
      const claims = verifySession(readToken());
      return {
        select(columns: string) {
          void columns;
          return {
            async order(column: "created_at") {
              void column;
              const data = claims
                ? rowsForUser(claims.sub).map(({ id, title, status, points }) => ({ id, title, status, points }))
                : [];
              return { data, error: null };
            },
          };
        },
        async insert(values: NewTask) {
          if (!claims) {
            return { error: { message: 'new row violates row-level security policy for table "tasks"' } };
          }
          insertRow(claims.sub, values);
          return { error: null };
        },
      };
    },
  };
}
