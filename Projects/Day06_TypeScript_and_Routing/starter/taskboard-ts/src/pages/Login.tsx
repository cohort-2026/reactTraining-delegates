import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Login() {
  const [name, setName] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as any)?.from?.pathname || "/"

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!name) return
    login(name)
    navigate(from, { replace: true })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Enter name"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}