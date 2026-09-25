import { useAuth } from "../auth/useAuth";

const tasks = [
  { id: 1, title: "Review sprint board", done: true },
  { id: 2, title: "Write release notes", done: false },
  { id: 3, title: "Plan the team retro", done: false },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.name ?? "friend"}.</p>
      <h2>Your tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.done ? "(done)" : ""}
          </li>
        ))}
      </ul>
    </section>
  );
}
