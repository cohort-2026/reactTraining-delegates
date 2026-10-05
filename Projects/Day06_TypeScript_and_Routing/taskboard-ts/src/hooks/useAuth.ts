import useLocalStorage from "./useLocalStorage";
import type { User } from "../types";

/**
 * useAuth
 * Manages the current user, persisted to localStorage.
 * Any component can call this and get the same state,
 * because they all read/write the same localStorage key.
 */
export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>("taskboard.user", null);

  function login(nextUser: User) {
    setUser(nextUser);
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}