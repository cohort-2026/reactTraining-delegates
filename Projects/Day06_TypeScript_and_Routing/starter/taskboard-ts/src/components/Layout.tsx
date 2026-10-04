import { Outlet, NavLink } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"

export default function Layout() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState<any[]>([
    { id: "1", title: "Learn React", status: "To do", assignee: "Asanda", points: 3, projectId: "p1" },
    { id: "2", title: "Build board", status: "In progress", assignee: "Asanda", points: 5, projectId: "p1" },
    { id: "3", title: "Deploy app", status: "Done", assignee: "Promise", points: 2, projectId: "p1" },
  ])

  const handleAdd = (data: any) => {
    const title = typeof data === 'string' ? data : data.title
    const assignee = typeof data === 'string' ? 'Amanda' : (data.assignee || 'Amanda')
    const points = typeof data === 'string' ? 1 : (Number(data.points) || 1)
    setTasks((prev: any) => [...prev, { 
      id: Date.now().toString(), 
      title: title || 'Untitled Task', 
      status: "To do", 
      assignee, 
      points, 
      projectId: "p1" 
    }])
  }

  const handleStatusChange = (id: string, status: any) => {
    setTasks((prev: any) => prev.map((t: any) => t.id === id ? { ...t, status } : t))
  }

  const handleRename = (id: string, title: string) => {
    setTasks((prev: any) => prev.map((t: any) => t.id === id ? { ...t, title } : t))
  }

  const handleDelete = (id: string) => {
    setTasks((prev: any) => prev.filter((t: any) => t.id !== id))
  }

  const context = { tasks, handleAdd, handleStatusChange, handleRename, handleDelete }

  return (
    <div>
      <header style={{ display: "flex", gap: 20, padding: 10, borderBottom: "1px solid #ddd" }}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <div style={{ marginLeft: "auto" }}>
          {user && <><span>Hello {user.name} </span><button onClick={logout}>Log out</button></>}
        </div>
      </header>
      <main style={{ padding: 20 }}>
        <Outlet context={context} />
      </main>
    </div>
  )
}