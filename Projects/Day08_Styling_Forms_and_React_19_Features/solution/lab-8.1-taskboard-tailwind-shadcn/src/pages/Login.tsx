import { useState } from "react";
import type { SubmitEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form onSubmit={handleSubmit} className="grid max-w-sm gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Log in</h1>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <Button type="submit">Log in</Button>
    </form>
  );
}
