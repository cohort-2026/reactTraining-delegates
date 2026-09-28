import { useEffect, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthStatus, User } from "./types";
import { getSession, login as apiLogin, logout as apiLogout } from "../api/authApi";
import { AuthContext } from "./AuthContext";

// TODO 1: Build the AuthProvider.
//
// It owns the auth state for the whole app and shares it through AuthContext
// (see ./AuthContext.ts and the AuthContextValue type in ./types.ts):
//
//   - `status` starts as "loading". On mount, call getSession() from
//     ../api/authApi to restore an existing session, then switch to
//     "authenticated" (with the user) or "anonymous".
//   - `login(email, password)` calls the mock API's login(). Let a failed login
//     reject, so the login form can show the error message.
//   - `logout()` calls the mock API's logout() and clears the user.
//
// Right now it just renders its children and shares nothing.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let ignore = false;

    async function restoreSession() {
      const session = await getSession();
      if (ignore) return;

      setUser(session?.user ?? null);
      setStatus(session ? "authenticated" : "anonymous");
    }

    void restoreSession();

    return () => {
      ignore = true;
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const session = await apiLogin(email, password);
    setUser(session.user);
    setStatus("authenticated");
  };

  const logout = async (): Promise<void> => {
    await apiLogout();
    setUser(null);
    setStatus("anonymous");
  };

  const value: AuthContextValue = { user, status, login, logout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
