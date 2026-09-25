import { Link } from "react-router";

export default function Home() {
  return (
    <section>
      <h1>Welcome to TaskBoard</h1>
      <p>Plan your team's work in one place. Anyone can read this page.</p>
      <p>
        Your <Link to="/dashboard">dashboard</Link> and settings are private: you need to log in to
        see them.
      </p>
    </section>
  );
}
