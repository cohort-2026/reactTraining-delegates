import { useLocalStorage } from './useLocalStorage'

export type User = { name: string }

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('user', null)

  function login(name: string) {
    const nextUser = { name }
    localStorage.setItem('user', JSON.stringify(nextUser))
    setUser(nextUser)
  }

  function logout() {
    setUser(null)
  }

  return { user, login, logout }
}