import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const login = (name: string) => setUser({ name });
  const logout = () => setUser(null);
  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}
