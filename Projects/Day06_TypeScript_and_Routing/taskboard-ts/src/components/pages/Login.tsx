import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

type LocationState = {
  from?: { pathname: string };
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from?.pathname ?? "/";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    login({ name: trimmed.split("@")[0], email: trimmed });
    navigate(from, { replace: true });
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <header className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Sign in
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Any email works — this is a mock login.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/20"
            autoFocus
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Log in
        </button>
      </form>
    </main>
  );
}

export default Login;