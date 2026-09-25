import { useState } from 'react'
import { clearSession, loadSession, saveSession, type Session } from './auth/session'
import { BoardPage } from './components/BoardPage'
import { LoginPage } from './components/LoginPage'

export default function App() {
  const [session, setSession] = useState<Session | null>(loadSession)
  const [boardId, setBoardId] = useState(() => session?.boards[0]?.id ?? '')
  const [loginMessage, setLoginMessage] = useState<string | null>(null)

  function handleLogin(next: Session) {
    saveSession(next)
    setSession(next)
    setBoardId(next.boards[0]?.id ?? '')
    setLoginMessage(null)
  }

  function logOut(message: string | null = null) {
    clearSession()
    setSession(null)
    setLoginMessage(message)
  }

  if (!session) return <LoginPage onLogin={handleLogin} message={loginMessage} />

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="brand">TaskBoard <span>Live</span></h1>
        <label className="board-picker">
          <span>Board</span>
          <select value={boardId} onChange={(e) => setBoardId(e.target.value)}>
            {session.boards.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.role})
              </option>
            ))}
          </select>
        </label>
        <div className="whoami">
          Signed in as <strong>{session.user.name}</strong>
          <button type="button" className="link-button" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      </header>

      {boardId ? (
        // `key` gives each board (and each login) a fresh socket and fresh state.
        <BoardPage
          key={`${session.token}:${boardId}`}
          token={session.token}
          boardId={boardId}
          onUnauthorised={() => logOut('Your session has expired. Please log in again.')}
        />
      ) : (
        <p className="empty">You are not a member of any boards yet.</p>
      )}
    </div>
  )
}
