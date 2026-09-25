import type { AuthContextValue } from "./types";

// TODO 2: Read the value from AuthContext instead of returning this placeholder.
// If there is no provider above the component, throw an Error whose message
// tells the developer to wrap their app (or test) in <AuthProvider>.
export function useAuth(): AuthContextValue {
  return {
    user: null,
    status: "anonymous",
    login: async () => {
      throw new Error("useAuth() is not finished yet (see src/auth/useAuth.ts).");
    },
    logout: async () => {},
  };
}
