import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function LoginForm() {
  const { user, login } = useAuth()
  const [name, setName] = useState('')

  if (user) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim() === '') return
    login(name.trim())
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Log in</button>
    </form>
  )
}