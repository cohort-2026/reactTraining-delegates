// TODO (Lab 7.1 steps 5-6): move user, login and logout into an AuthProvider in src/context,
// and change useAuth to read AuthContext with useContext (throw a clear error outside the provider).
import { useLocalStorage } from "./useLocalStorage";

export type User = { name: string };

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  function login(name: string) {
    setUser({ name });
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}
