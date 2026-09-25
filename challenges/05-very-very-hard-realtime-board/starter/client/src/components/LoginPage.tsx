import { useActionState } from 'react'
import { login, type Session } from '../auth/session'

interface Props {
  onLogin: (session: Session) => void
  /** Shown above the form, e.g. "Your session has expired". */
  message: string | null
}

export function LoginPage({ onLogin, message }: Props) {
  const [error, formAction, isPending] = useActionState(
    async (_previous: string | null, formData: FormData) => {
      try {
        const session = await login(String(formData.get('username')), String(formData.get('password')))
        onLogin(session)
        return null
      } catch (err) {
        return err instanceof Error ? err.message : 'Login failed.'
      }
    },
    null,
  )

  return (
    <main className="login">
      <form action={formAction} className="login-card" aria-labelledby="login-title">
        <h1 id="login-title" className="brand">TaskBoard <span>Live</span></h1>
        {message && <p className="notice notice-info">{message}</p>}
        <label>
          Username
          <input name="username" autoComplete="username" required defaultValue="alice" />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={isPending}>
          {isPending ? 'Logging in…' : 'Log in'}
        </button>
        <p className="hint">
          Demo users: <code>alice</code>, <code>bob</code>, <code>carol</code>. Password: <code>password123</code>.
        </p>
      </form>
    </main>
  )
}
