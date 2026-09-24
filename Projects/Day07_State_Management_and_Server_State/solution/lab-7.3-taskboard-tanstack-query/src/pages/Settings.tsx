import { ThemeButton } from "../components/ThemeButton";
import { useAuth } from "../hooks/useAuth";

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <section>
      <h1>Settings</h1>
      <p>Signed in as {user?.name}.</p>
      <p><ThemeButton /></p>
      <button className="reset-button" onClick={logout}>Log out</button>
    </section>
  );
}
