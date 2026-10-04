// TODO (Lab 6.1 steps 2 and 5): in taskboard-ts this becomes App.tsx. Type every handler parameter
// (id: string, status: Status) and pass the type to the Hook: useLocalStorage<Task[] | null>("tasks", null).
// TODO (Lab 6.2 steps 2-5): move the tasks state, the seeding effect and the handlers into src/pages/Layout.tsx,
// share tasks with the pages through Outlet context, and add a projectId to every seeded and new task.
// TODO (Lab 6.3 step 6): show the user's name and a Log out button in Layout.tsx, and pass the user to the pages through Outlet context. Add a Log in page that sets the user in state and localStorage.
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import Layout from "./components/Layout"
import Board from "./pages/Dashboard"
import Settings from "./pages/Settings"
import Login from "./pages/Login"

function Protected({ children }: { children: any }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><Layout /></Protected>}>
        <Route index element={<Board />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}