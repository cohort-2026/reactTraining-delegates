// TODO: logging in and out.
import { API_URL } from "../api/config";
import type { User } from "../types";

/** Thrown by login() when the server says no. The message is shown on the login page. */
export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

export const LOGIN_URL = `${API_URL}/auth/login`;
export const LOGOUT_URL = `${API_URL}/auth/logout`;

/**
 * POST { email, password } to LOGIN_URL.
 * - 200: store { accessToken, user } in the token store and resolve with the user.
 * - 401: throw new LoginError("Wrong email or password").
 * - anything else: throw a LoginError with a useful message.
 * Use credentials: "include" so a real browser would accept the refresh cookie.
 */
export async function login(email: string, password: string): Promise<User> {
  // TODO
  void email;
  void password;
  throw new LoginError("Not implemented yet: see src/auth/session.ts");
}

/**
 * POST to LOGOUT_URL (so the server revokes the refresh token), then, even if that
 * request fails: clear the session, emit a "user" logout, and tell other tabs.
 */
export async function logout(): Promise<void> {
  // TODO
}
