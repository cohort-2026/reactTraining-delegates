export type User = {
  id: string;
  name: string;
  email: string;
};

export type Session = {
  user: User;
  token: string;
  /** When the session stops being valid, in milliseconds since 1970 (like Date.now()). */
  expiresAt: number;
};

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
