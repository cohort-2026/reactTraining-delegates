import { createContext } from "react";

export type User = { name: string };

export type AuthContextValue = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);