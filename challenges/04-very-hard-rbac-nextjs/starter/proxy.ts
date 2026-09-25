// The proxy (Next.js 16's new name for middleware) runs before a page renders.
// It is only the first line of defence: Server Actions and route handlers must
// still check the session and the policy themselves.
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // TODO:
  //   - read the session cookie from request.cookies and verify it
  //   - no valid session on /board or /admin  -> redirect to /login
  //   - /admin for anyone the policy does not allow to manage users -> redirect to /board
  //   - (optional) a signed-in user visiting /login -> redirect to /board
  //   - otherwise NextResponse.next()
  void request;
  return NextResponse.next();
}

export const config = {
  // TODO: list the paths the proxy should run on (see the matcher docs).
  matcher: [],
};
