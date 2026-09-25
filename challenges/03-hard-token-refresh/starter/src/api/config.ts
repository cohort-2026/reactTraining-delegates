// All API calls go to /api on the page's own origin. MSW intercepts them, in the
// browser (a service worker) and in the tests (msw/node), so there is no real server.
// We build an absolute URL because fetch in Node (the tests) cannot resolve "/api/...".
export const API_URL = `${window.location.origin}/api`;
