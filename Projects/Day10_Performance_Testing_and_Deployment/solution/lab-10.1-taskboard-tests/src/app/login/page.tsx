"use client";

import { useActionState } from "react";
import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// One form, two buttons. Each button's formAction points at a different
// Server Action, called with (prev, formData) via its own useActionState,
// not passed to the form directly (a raw Server Action on formAction
// would receive FormData only, with no prev argument).
export default function LoginPage() {
  const [loginState, loginAction, loginPending] =
    useActionState(login, { error: null });
  const [signupState, signupAction, signupPending] =
    useActionState(signup, { error: null });
  const error = loginState.error ?? signupState.error;

  return (
    <section className="mx-auto grid max-w-sm gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Log in</h1>
      <form className="grid gap-3" noValidate>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required minLength={6}
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined} />
        </div>
        <div className="flex gap-2">
          <Button type="submit" formAction={loginAction} disabled={loginPending}>
            {loginPending ? "Logging in..." : "Log in"}
          </Button>
          <Button type="submit" formAction={signupAction} disabled={signupPending} variant="outline">
            {signupPending ? "Signing up..." : "Sign up"}
          </Button>
        </div>
        {error && (
          <p id="login-error" role="alert" className="text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        )}
      </form>
      <p className="text-sm text-muted-foreground">
        New here? Fill in the form and click <strong>Sign up</strong>. Your class project has
        email confirmation turned off, so you are signed in immediately.
      </p>
    </section>
  );
}
