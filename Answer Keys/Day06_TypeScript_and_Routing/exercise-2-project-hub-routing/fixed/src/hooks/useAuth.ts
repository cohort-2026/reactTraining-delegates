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
