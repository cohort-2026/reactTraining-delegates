import { useState } from "react";
import type { SubmitEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    login(name.trim() || "Demo user");
    navigate(from, { replace: true });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button type="submit">Log in</button>
    </form>
  );
}
