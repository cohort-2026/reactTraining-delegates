"use client";
import { useActionState } from "react";
import { initialState } from "@/lib/action-state";
import { DEMO_PASSWORD, DEMO_USERS } from "@/lib/demo-users";
import { login } from "./actions";

export default function LoginPage() {
  const [state, loginAction, isPending] = useActionState(login, initialState);

  return (
    <div className="stack">
      <form action={loginAction} className="stack card">
        <h1>Log in to TaskBoard</h1>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
        <button disabled={isPending}>{isPending ? "Logging in…" : "Log in"}</button>
        {state.error && <p role="alert" className="error">{state.error}</p>}
      </form>

      <section className="card">
        <h2>Demo accounts</h2>
        <p>
          Every account uses the password <code>{DEMO_PASSWORD}</code>.
        </p>
        <table>
          <thead>
            <tr><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {DEMO_USERS.map((user) => (
              <tr key={user.id}>
                <td><code>{user.email}</code></td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
