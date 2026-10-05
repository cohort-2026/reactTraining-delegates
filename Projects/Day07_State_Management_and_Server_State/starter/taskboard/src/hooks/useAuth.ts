// TODO (Lab 7.1 steps 5-6): move user, login and logout into an AuthProvider in src/context,
// and change useAuth to read AuthContext with useContext (throw a clear error outside the provider).
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return ctx;
}
