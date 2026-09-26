"use client";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, loginAction, isPending] =
    useActionState(login, { error: null });

  return (
    <form action={loginAction} className="stack">
      <h1>Log in</h1>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password"
        required minLength={6} />
      <button disabled={isPending}>Log in</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
