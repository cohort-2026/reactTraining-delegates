import { useState } from 'react'
import { DEMO_EMAIL, DEMO_PASSWORD } from './api/auth'
import { LoginForm } from './components/LoginForm'
import type { User } from './types'

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <main className="page">
      <div className="card">
        {user ? (
          <p className="welcome" role="status">
            Welcome back, {user.email}
          </p>
        ) : (
          <>
            <LoginForm onSuccess={setUser} />
            <p className="demo-hint">
              Demo account: <code>{DEMO_EMAIL}</code> / <code>{DEMO_PASSWORD}</code>
            </p>
          </>
        )}
      </div>
    </main>
  )
}
