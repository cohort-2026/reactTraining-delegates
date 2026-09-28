export const DEFAULT_REDIRECT = "/dashboard";

/**
 * Turns the ?redirect= value from the URL into somewhere to send the user after
 * they log in.
 */
export function getSafeRedirect(target: string | null | undefined): string {
  const value = target?.trim();

  if (!value || !value.startsWith("/")) {
    return DEFAULT_REDIRECT;
  }

  if (value.startsWith("//") || value.startsWith("/\\") || value.includes("\\")) {
    return DEFAULT_REDIRECT;
  }

  try {
    const parsed = new URL(value, window.location.origin);

    if (parsed.origin !== window.location.origin || parsed.protocol === "javascript:") {
      return DEFAULT_REDIRECT;
    }

    return value;
  } catch {
    return DEFAULT_REDIRECT;
  }
}
