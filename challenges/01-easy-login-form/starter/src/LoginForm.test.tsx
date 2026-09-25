import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { DEMO_EMAIL, DEMO_PASSWORD, login } from './api/auth'
import type { User } from './types'

// Keep the real mock API, but wrap `login` in a spy so a test can check
// what it was called with, or hold it "in flight" to see the pending state.
vi.mock('./api/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./api/auth')>()
  return { ...actual, login: vi.fn(actual.login) }
})

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((res) => {
    resolve = res
  })
  return { promise, resolve }
}

function setup() {
  const user = userEvent.setup()
  render(<App />)
  return {
    user,
    email: screen.getByLabelText('Email'),
    password: screen.getByLabelText('Password'),
    submit: screen.getByRole('button', { name: /^sign in$/i }),
  }
}

beforeEach(() => {
  // Back to the real implementation, with no recorded calls.
  vi.mocked(login).mockReset()
})

describe('Login form: fields and first render', () => {
  it('renders labelled Email and Password inputs', () => {
    const { email, password } = setup()

    expect(email).toHaveAttribute('type', 'email')
    expect(password).toHaveAttribute('type', 'password')
  })

  it('shows no errors before the user has touched anything', () => {
    const { email, password } = setup()

    expect(email).not.toHaveAttribute('aria-invalid', 'true')
    expect(password).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByText(/enter your email/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/enter your password/i)).not.toBeInTheDocument()
  })

  it('disables Sign in while the form is empty', () => {
    const { submit } = setup()

    expect(submit).toBeDisabled()
  })
})

describe('Login form: validation', () => {
  it('does not show an email error while the user is still typing', async () => {
    const { user, email } = setup()

    await user.type(email, 'sam')

    expect(email).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByText('Enter a valid email address')).not.toBeInTheDocument()
  })

  it('shows "Enter your email address" when Email is left empty', async () => {
    const { user, email } = setup()

    await user.click(email)
    await user.tab()

    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription(/Enter your email address/)
  })

  it('shows "Enter a valid email address" on blur for a badly formed email', async () => {
    const { user, email } = setup()

    await user.type(email, 'sam@example')
    await user.tab()

    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription(/Enter a valid email address/)
  })

  it('shows "Enter your password" when Password is left empty', async () => {
    const { user, password } = setup()

    await user.click(password)
    await user.tab()

    expect(password).toHaveAttribute('aria-invalid', 'true')
    expect(password).toHaveAccessibleDescription(/Enter your password/)
  })

  it('shows "Password must be at least 8 characters" on blur for a short password', async () => {
    const { user, password } = setup()

    await user.type(password, 'short')
    await user.tab()

    expect(password).toHaveAttribute('aria-invalid', 'true')
    expect(password).toHaveAccessibleDescription(/Password must be at least 8 characters/)
  })

  it('re-validates on every change once a field has been blurred', async () => {
    const { user, email } = setup()

    await user.type(email, 'sam')
    await user.tab()
    expect(email).toHaveAccessibleDescription(/Enter a valid email address/)

    // Fixing the value clears the error straight away, without another blur.
    await user.type(email, '@example.com')
    expect(email).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByText('Enter a valid email address')).not.toBeInTheDocument()

    // Breaking it again shows the right message straight away too.
    await user.clear(email)
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription(/Enter your email address/)
  })

  it('enables Sign in only when both fields are valid', async () => {
    const { user, email, password, submit } = setup()

    await user.type(email, 'sam@example.com')
    expect(submit).toBeDisabled()

    await user.type(password, 'short')
    expect(submit).toBeDisabled()

    await user.type(password, 'er-one')
    expect(submit).toBeEnabled()
  })
})

describe('Login form: show and hide password', () => {
  it('toggles the password between hidden and visible', async () => {
    const { user, password } = setup()

    await user.type(password, 'secret-value')
    await user.click(screen.getByRole('button', { name: /show password/i }))

    expect(password).toHaveAttribute('type', 'text')
    expect(password).toHaveValue('secret-value')

    await user.click(screen.getByRole('button', { name: /hide password/i }))

    expect(password).toHaveAttribute('type', 'password')
    expect(login).not.toHaveBeenCalled()
  })
})

describe('Login form: submitting', () => {
  it('shows a pending state while signing in', async () => {
    const pending = deferred<User>()
    vi.mocked(login).mockReturnValueOnce(pending.promise)
    const { user, email, password, submit } = setup()

    await user.type(email, DEMO_EMAIL)
    await user.type(password, DEMO_PASSWORD)
    await user.click(submit)

    expect(login).toHaveBeenCalledTimes(1)
    expect(login).toHaveBeenCalledWith(DEMO_EMAIL, DEMO_PASSWORD)
    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
    expect(email).toBeDisabled()
    expect(password).toBeDisabled()

    await act(async () => {
      pending.resolve({ email: DEMO_EMAIL })
    })
  })

  it('shows "Invalid email or password" for the wrong credentials and lets the user try again', async () => {
    const { user, email, password, submit } = setup()

    await user.type(email, 'sam@example.com')
    await user.type(password, 'wrong-password')
    await user.click(submit)

    const alert = await screen.findByRole('alert', {}, { timeout: 3000 })
    expect(alert).toHaveTextContent('Invalid email or password')

    expect(email).toBeEnabled()
    expect(password).toBeEnabled()
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeEnabled()
  })

  it('welcomes the user back after signing in with the demo account', async () => {
    const { user, email, password, submit } = setup()

    await user.type(email, DEMO_EMAIL)
    await user.type(password, DEMO_PASSWORD)
    await user.click(submit)

    expect(
      await screen.findByText(`Welcome back, ${DEMO_EMAIL}`, {}, { timeout: 3000 }),
    ).toBeInTheDocument()
  })
})
