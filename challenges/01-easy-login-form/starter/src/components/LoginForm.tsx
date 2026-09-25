import type { User } from "../types";
import { useState } from "react";
import { login } from "../api/auth";

interface LoginFormProps {
  /** Call this with the user that `login()` resolves with. */
  onSuccess: (user: User) => void;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const passwordMinLength = 8;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasValidationErrors = !!getEmailError(email) || !!getPasswordError(password);
  
  function getEmailError(email: string) {
    if (!email) {
      return "Enter your email address.";
    }
    if (!emailRegex.test(email)) {
      return "Enter a valid email address.";
    }
    return "";
  }

  function getPasswordError(password: string) {
    if (!password) {
      return "Enter your password.";
    }
    if (password.length < passwordMinLength) {
      return `Password must be at least ${passwordMinLength} characters.`;
    }
    return "";
  }

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    onSuccess: (user: User) => void,
  ) => {
    event.preventDefault(); // prevents browser from reloading the page on form submission
    setIsSubmitting(true);
    setFormError("");
    try {
      const user = await login(email, password);// Calls the login API function
      onSuccess(user);
    } catch (error) {
      setFormError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e, onSuccess)}>
      <h1>Sign in to TaskBoard</h1>

      {/* TODO: Email field and its error message */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        disabled={isSubmitting}
        aria-invalid={emailBlurred && !!getEmailError(email)}
        aria-describedby={emailBlurred && getEmailError(email) ? "email-error" : undefined}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setEmailBlurred(true)}
      />
      {/* Validate the email input field and display error message */}
      {emailBlurred && getEmailError(email) && (
        <span className="field-error" id="email-error">
          {getEmailError(email)}
        </span>
      )}

      {/* TODO: Password field, a Show password / Hide password button, and its error message */}
      <label htmlFor="password">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        value={password}
        disabled={isSubmitting}
        aria-invalid={passwordBlurred && !!getPasswordError(password)}
        aria-describedby={passwordBlurred && getPasswordError(password) ? "password-error" : undefined}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setPasswordBlurred(true)}
      />
      <button type="button" onClick={togglePasswordVisibility}>
        {showPassword ? "Hide password" : "Show password"}
      </button>
      {/* Validate the password input field and display error message */}
      {passwordBlurred && getPasswordError(password) && (
        <span className="field-error" id="password-error">
          {getPasswordError(password)}
        </span>
      )}

      {/* TODO: form-level error */}
      {formError && (
        <span className="form-error" role="alert">
          {formError}
        </span>
      )}

      {/* TODO: disable until the form is valid; show "Signing in…" while pending */}
      <button type="submit" disabled={hasValidationErrors || isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
