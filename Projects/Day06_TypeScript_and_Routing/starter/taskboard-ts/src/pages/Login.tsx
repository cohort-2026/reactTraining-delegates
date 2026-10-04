import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function Login() {
  const [name, setName] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    login(trimmedName);
    navigate(from, { replace: true });
  }

  return (
    <main>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <button type="submit">Log in</button>
      </form>
    </main>
  );
}

export default Login;
