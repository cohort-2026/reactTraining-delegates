export type User = {
  id: string;
  name: string;
  email: string;
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

/** What POST /api/auth/login returns. The refresh token is NOT in the body: it arrives as a cookie. */
export type LoginResponse = {
  accessToken: string;
  /** Seconds until the access token expires. */
  expiresIn: number;
  user: User;
};

/** What POST /api/auth/refresh returns. A new refresh token is set as a cookie at the same time. */
export type RefreshResponse = {
  accessToken: string;
  expiresIn: number;
};

/** Every error from the API has this shape, for example { code: "token_expired" }. */
export type ApiError = {
  code: string;
  message?: string;
};
