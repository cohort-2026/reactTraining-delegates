// TODO: wire the auth pieces into React.
//
// AuthProvider must:
//  - read the session from the token store so the UI re-renders when it changes
//    (useSyncExternalStore is made for this);
//  - listen for logouts (onLogout in authEvents.ts): remember the reason for the
//    login page, and call queryClient.clear() so no signed-in data survives;
//  - start cross-tab sync in an effect (startCrossTabSync in crossTab.ts). When
//    another tab logs out: clear the session and emit a "remote" logout. Close
//    the channel in the cleanup function;
//  - pass login and logout (from session.ts) down through the context.
//
// It sits inside <QueryClientProvider>, so useQueryClient() works here.
import { type ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import { login, logout } from "./session";

export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO: replace this placeholder value. Nobody is ever signed in yet.
  const value: AuthContextValue = {
    user: null,
    logoutReason: null,
    login: async (email, password) => {
      await login(email, password);
    },
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
