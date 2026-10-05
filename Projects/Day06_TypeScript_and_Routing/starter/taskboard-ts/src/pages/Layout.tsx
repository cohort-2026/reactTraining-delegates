import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { NavLink, Outlet } from 'react-router'
import Header from '../components/Header'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { NewTask, Status, Task } from '../types'

const SEED_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
type SeedTodo = { id: number; title: string; completed: boolean }

export type BoardContext = {
  tasks: Task[] | null
  setTasks: Dispatch<SetStateAction<Task[] | null>>
  onAdd: (task: NewTask, projectId: string) => void
  onStatusChange: (id: string, status: Status) => void
  onRename: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export default function Layout() {
  const [tasks, setTasks] = useLocalStorage<Task[] | null>('tasks', null)
  const { user, logout } = useAuth()

  useEffect(() => {
    if (tasks !== null) return
    const controller = new AbortController()

    fetch(SEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<SeedTodo[]>
      })
      .then((todos) => setTasks(todos.map((todo) => ({
        id: String(todo.id),
        title: todo.title,
        status: todo.completed ? 'done' : 'todo',
        points: 1,
        projectId: todo.id % 2 === 0 ? 'mobile' : 'website',
      }))))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') console.error(error)
      })

    return () => controller.abort()
  }, [tasks, setTasks])

  function handleAdd(task: NewTask, projectId: string) {
    setTasks((previous) => [...(previous ?? []), {
      ...task,
      id: crypto.randomUUID(),
      status: 'todo',
      projectId,
    }])
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((previous) => previous?.map((task) => task.id === id ? { ...task, status } : task) ?? null)
  }

  function handleRename(id: string, title: string) {
    setTasks((previous) => previous?.map((task) => task.id === id ? { ...task, title } : task) ?? null)
  }

  function handleDelete(id: string) {
    setTasks((previous) => previous?.filter((task) => task.id !== id) ?? null)
  }

  const boardContext = { tasks, setTasks, onAdd: handleAdd, onStatusChange: handleStatusChange, onRename: handleRename, onDelete: handleDelete } satisfies BoardContext

  return (
    <>
      <Header tasks={tasks ?? []} userName={user?.name ?? null} onLogout={logout} />
      <nav className="navigation" aria-label="Main navigation">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/projects/website">Website</NavLink>
        <NavLink to="/projects/mobile">Mobile app</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <span className="spacer" />
        {!user && <NavLink to="/login">Log in</NavLink>}
      </nav>
      <button className="reset-button" type="button" onClick={() => setTasks(null)}>Reset board</button>
      <main><Outlet context={boardContext} /></main>
    </>
  )
}