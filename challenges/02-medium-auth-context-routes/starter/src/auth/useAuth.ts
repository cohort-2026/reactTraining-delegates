import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./types";

// TODO 2: Read the value from AuthContext instead of returning this placeholder.
// If there is no provider above the component, throw an Error whose message
// tells the developer to wrap their app (or test) in <AuthProvider>.
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth() must be used inside <AuthProvider>");
  }

  return context;
}
