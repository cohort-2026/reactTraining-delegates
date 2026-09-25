import { useAuth } from "./auth/AuthContext";
import { LoginPage } from "./components/LoginPage";
import { TasksPage } from "./components/TasksPage";

export default function App() {
  const { user } = useAuth();
  return user ? <TasksPage /> : <LoginPage />;
}
