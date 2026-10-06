import { ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useLocalStorage<User | null>("user", null);
    const login = (name: string) => setUser({ name });
    const logout = () => setUser(null);
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}