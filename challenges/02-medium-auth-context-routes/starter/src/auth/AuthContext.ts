import { createContext } from "react";
import type { AuthContextValue } from "./types";

// null means "no provider above this component". useAuth() checks for it.
export const AuthContext = createContext<AuthContextValue | null>(null);
