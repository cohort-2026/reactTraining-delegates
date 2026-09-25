// The fake API. The same handlers run in the browser (browser.ts, for `npm run dev`)
// and in the tests (node.ts).
import { delay, http, HttpResponse } from "msw";
import { API_URL } from "../api/config";
import {
  DEMO_PASSWORD,
  DEMO_USER,
  addTask,
  checkAccessToken,
  countCall,
  createSession,
  endSessionFromCookie,
  getRefreshDelayMs,
  issueAccessToken,
  listTasks,
  rotateRefreshToken,
} from "./backend";

const error = (status: number, code: string, message?: string) =>
  HttpResponse.json({ code, message }, { status });

export const handlers = [
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    countCall("loginCalls");
    const body = (await request.json()) as { email?: string; password?: string };
    if (body.email !== DEMO_USER.email || body.password !== DEMO_PASSWORD) {
      return error(401, "invalid_credentials", "Wrong email or password");
    }
    const session = createSession(DEMO_USER);
    return HttpResponse.json({ ...issueAccessToken(session.id), user: DEMO_USER });
  }),

  // Reads the refresh token from the (simulated) cookie, never from the body.
  http.post(`${API_URL}/auth/refresh`, async () => {
    const wait = getRefreshDelayMs();
    if (wait > 0) await delay(wait);
    const result = rotateRefreshToken();
    if (!result.ok) return error(result.status, result.code);
    return HttpResponse.json({ accessToken: result.accessToken, expiresIn: result.expiresIn });
  }),

  http.post(`${API_URL}/auth/logout`, () => {
    endSessionFromCookie();
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(`${API_URL}/tasks`, ({ request }) => {
    countCall("taskRequests");
    const auth = checkAccessToken(request.headers.get("Authorization"));
    if (!auth.ok) return error(401, auth.code);
    return HttpResponse.json(listTasks());
  }),

  http.post(`${API_URL}/tasks`, async ({ request }) => {
    countCall("taskRequests");
    const auth = checkAccessToken(request.headers.get("Authorization"));
    if (!auth.ok) return error(401, auth.code);
    const body = (await request.json()) as { title?: string };
    if (!body.title?.trim()) return error(400, "title_required");
    return HttpResponse.json(addTask(body.title.trim()), { status: 201 });
  }),
];
