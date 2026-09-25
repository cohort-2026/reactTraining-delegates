/** What every Server Action in this app returns to useActionState. */
export type ActionState = { error: string | null };

export const initialState: ActionState = { error: null };

// Error messages are shared with the tests, so use these constants.
export const ERRORS = {
  notSignedIn: "Not signed in",
  forbidden: "You do not have permission to do that",
  invalid: "Invalid input",
  notFound: "Not found",
  badLogin: "Invalid email or password",
  crossSite: "Cross-site request blocked",
} as const;
