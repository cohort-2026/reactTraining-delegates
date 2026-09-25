import type { User } from '../types'

interface LoginFormProps {
  /** Call this with the user that `login()` resolves with. */
  onSuccess: (user: User) => void
}

// TODO: build the login form described in the README.
//
// State you will need (all with useState):
// - the email and password values, so both inputs are controlled
// - which fields the user has already left (blurred), so a field's error
//   only appears after its first blur and then updates on every keystroke
// - whether the password is visible
// - whether the form is submitting
// - a form-level error message (for "Invalid email or password")
//
// Do NOT store the validation messages in state. Work them out from the
// current values on every render (derived state), then decide whether to
// show them.
//
// On submit: prevent the page reload, call login(email, password) from
// '../api/auth', show the pending state while it runs, then either call
// onSuccess(user) or show the error.
//
// Accessibility: every input needs a visible <label>. An input with an
// error gets aria-invalid="true" and aria-describedby pointing at the id
// of its message. The form-level error uses role="alert".
export function LoginForm({ onSuccess }: LoginFormProps) {
  // Remove this line once you call onSuccess yourself.
  void onSuccess

  return (
    <form className="login-form">
      <h1>Sign in to TaskBoard</h1>

      {/* TODO: Email field and its error message */}

      {/* TODO: Password field, a Show password / Hide password button, and its error message */}

      {/* TODO: form-level error */}

      {/* TODO: disable until the form is valid; show "Signing in…" while pending */}
      <button type="submit">Sign in</button>
    </form>
  )
}
