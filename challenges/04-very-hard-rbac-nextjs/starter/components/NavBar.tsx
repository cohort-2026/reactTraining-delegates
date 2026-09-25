import Link from "next/link";
import { logout } from "@/app/login/actions";
import { can } from "@/lib/permissions";
import type { SessionUser } from "@/lib/types";

export function NavBar({ user }: { user: SessionUser }) {
  return (
    <header className="row nav">
      <nav className="row">
        <Link href="/board">Board</Link>
        {can(user, "user:manage") && <Link href="/admin">Admin</Link>}
      </nav>
      <div className="row">
        <span>
          Signed in as <strong>{user.name}</strong> <span className={`badge ${user.role}`}>{user.role}</span>
        </span>
        <form action={logout}>
          <button className="secondary">Log out</button>
        </form>
      </div>
    </header>
  );
}
