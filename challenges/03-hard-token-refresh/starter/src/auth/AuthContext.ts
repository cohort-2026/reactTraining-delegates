// PROVIDED. The shape of the auth context, and the useAuth() Hook that reads it.
import { createContext, useContext } from "react";
import type { User } from "../types";
import type { LogoutReason } from "./authEvents";

export type AuthContextValue = {
  /** The signed-in user, or null. */
  user: User | null;
  /** Why the last logout happened (null if there has not been one). The login page uses it. */
  logoutReason: LogoutReason | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
