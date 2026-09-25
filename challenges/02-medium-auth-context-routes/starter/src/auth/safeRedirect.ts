export const DEFAULT_REDIRECT = "/dashboard";

/**
 * Turns the ?redirect= value from the URL into somewhere to send the user after
 * they log in.
 *
 * TODO 4: This currently trusts whatever is in the URL, and anyone can craft a
 * login link. Only allow paths inside this app, starting with a single "/".
 * Anything else (another site, "//host", "/\host", "javascript:...", a path
 * without a leading slash, or no value at all) should fall back to DEFAULT_REDIRECT.
 */
export function getSafeRedirect(target: string | null | undefined): string {
  return target ?? DEFAULT_REDIRECT;
}
