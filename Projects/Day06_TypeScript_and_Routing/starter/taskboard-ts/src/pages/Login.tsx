import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [name, setName] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    login(name.trim() || 'Demo user')
    navigate(from, { replace: true })
  }

  return (
    <section className="login-page">
      <h2>Log in</h2>
      <p>Enter a name to continue to the protected page.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-name">Name</label>
        <input id="login-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
        <button type="submit">Log in</button>
      </form>
    </section>
  )
}