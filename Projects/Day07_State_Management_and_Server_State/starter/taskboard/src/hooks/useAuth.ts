// TODO (Lab 7.1 steps 5-6): move user, login and logout into an AuthProvider in src/context,
// and change useAuth to read AuthContext with useContext (throw a clear error outside the provider).
import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  return useAuthContext();
}