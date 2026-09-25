// A panel for poking the FAKE server by hand in `npm run dev`. It imports the mock
// backend directly, which real app code must never do. Not rendered in the tests.
import { useEffect, useState } from "react";
import { mockBackend } from "../mocks/backend";

export function DevTools() {
  const [stats, setStats] = useState(mockBackend.stats);

  useEffect(() => {
    const id = setInterval(() => setStats(mockBackend.stats), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="devtools" aria-label="Mock server controls">
      <strong>Mock server</strong>
      <span>
        refresh calls: {stats.refreshCalls} · task requests: {stats.taskRequests} · active
        sessions: {mockBackend.activeSessionCount()}
      </span>
      <button type="button" onClick={() => mockBackend.expireAccessTokens()}>
        Expire access tokens now
      </button>
      <button type="button" onClick={() => mockBackend.revokeAllSessions()}>
        Revoke all sessions
      </button>
      <button type="button" onClick={() => mockBackend.failNextRefresh()}>
        Fail next refresh (500)
      </button>
    </aside>
  );
}
