import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<{ name: string } | null>(
    "auth-user",
    null,
  );

  function login(name: string) {
    setUser({ name });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
