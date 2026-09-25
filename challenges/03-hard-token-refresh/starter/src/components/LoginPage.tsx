import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";

export function LoginPage() {
  const { login, logoutReason } = useAuth();
  const [email, setEmail] = useState("demo@taskboard.dev");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setPending(false);
    }
  }

  return (
    <main>
      <h1>Sign in</h1>
      {logoutReason === "session_expired" && (
        <p className="notice" role="status">
          Your session has expired. Please sign in again.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={pending}>
          {pending ? "Signing in..." : "Sign in"}
        </button>
        <p>
          Demo account: <code>demo@taskboard.dev</code> / <code>password123</code>
        </p>
      </form>
    </main>
  );
}
