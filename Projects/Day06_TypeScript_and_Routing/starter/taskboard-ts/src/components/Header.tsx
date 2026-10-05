import { useEffect } from 'react'
import type { Task } from '../types'

type HeaderProps = {
  tasks: Task[]
  userName: string | null
  onLogout: () => void
}

export default function Header({ tasks, userName, onLogout }: HeaderProps) {
  const doneCount = tasks.filter((task) => task.status === 'done').length
  const openCount = tasks.length - doneCount

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`
  }, [openCount])

  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>{doneCount} of {tasks.length} done</p>
      {userName && (
        <div className="user-actions">
          <span>{userName}</span>
          <button type="button" onClick={onLogout}>Log out</button>
        </div>
      )}
    </header>
  )
}