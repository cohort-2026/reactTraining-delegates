// Stand-ins for the parts of Next.js that only work inside a running app.
// test/setup.ts wires them in with vi.mock().

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none" | boolean;
  path?: string;
  maxAge?: number;
  expires?: Date | number;
};

export type StoredCookie = { value: string; options: CookieOptions };

/** The browser's cookies, as the server sees them. Cleared before every test. */
export const cookieJar = new Map<string, StoredCookie>();

export async function cookies() {
  return {
    get(name: string) {
      const cookie = cookieJar.get(name);
      return cookie && { name, value: cookie.value };
    },
    getAll() {
      return [...cookieJar].map(([name, { value }]) => ({ name, value }));
    },
    has(name: string) {
      return cookieJar.has(name);
    },
    // Supports both set(name, value, options) and set({ name, value, ...options }).
    set(...args: [string, string, CookieOptions?] | [{ name: string; value: string } & CookieOptions]) {
      if (typeof args[0] === "string") {
        const [name, value, options = {}] = args as [string, string, CookieOptions?];
        cookieJar.set(name, { value, options });
      } else {
        const { name, value, ...options } = args[0];
        cookieJar.set(name, { value, options });
      }
    },
    delete(nameOrOptions: string | { name: string }) {
      cookieJar.delete(typeof nameOrOptions === "string" ? nameOrOptions : nameOrOptions.name);
    },
  };
}

/** Thrown by the mocked redirect(), like the real one throws NEXT_REDIRECT. */
export class RedirectError extends Error {
  constructor(public readonly url: string) {
    super(`NEXT_REDIRECT to ${url}`);
  }
}

export function redirect(url: string): never {
  throw new RedirectError(url);
}
