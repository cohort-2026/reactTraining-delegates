import { createContext, useContext, useState } from "react"

type User = { name: string } | null

type AuthType = {
  user: User
  login: (name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem("user")
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      localStorage.removeItem("user")
    }
    return null
  })

  const login = (name: string) => {
    const newUser = { name: name }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be inside AuthProvider")
  }
  return context
}