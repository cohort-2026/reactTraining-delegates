import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

// A mock login: the user is kept in localStorage and is not real authentication.
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

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