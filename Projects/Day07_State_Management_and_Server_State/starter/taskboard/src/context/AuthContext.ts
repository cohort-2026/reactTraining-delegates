import { createContext } from "react";

export type User = { name: string };
export type AuthValue = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);
