import type { ReactNode } from "react";

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
  return children;
}
