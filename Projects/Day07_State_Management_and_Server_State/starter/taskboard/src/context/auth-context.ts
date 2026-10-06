import { createContext } from "react";

export type AuthContextValue = {
  user: { name: string } | null;
  login: (name: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
