import { useAuth } from "../auth/AuthContext";
import { TaskList } from "./TaskList";

export function TasksPage() {
  const { user, logout } = useAuth();

  return (
    <main>
      <div className="toolbar">
        <h1>Your tasks</h1>
        <span>
          Signed in as {user?.name}{" "}
          <button type="button" onClick={() => logout()}>
            Sign out
          </button>
        </span>
      </div>
      <TaskList />
    </main>
  );
}
