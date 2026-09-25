import { useAuth } from "../hooks/useAuth";

export default function Settings() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Settings</h1>
      <p>Logged in as {user?.name}.</p>
    </section>
  );
}
