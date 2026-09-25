/**
 * True when the request's Origin header names this site.
 *
 * Server Actions get this check from Next.js automatically. Route handlers
 * do not, so a POST /api/tasks handler must call this itself.
 */
export function isSameOrigin(request: Request): boolean {
  // TODO: compare the Origin header's host with the host the request was
  // sent to (the Host header, or X-Forwarded-Host behind a proxy, falling
  // back to new URL(request.url).host). A missing or unparseable Origin
  // (including the literal string "null") is not same-origin.
  void request;
  return true;
}
