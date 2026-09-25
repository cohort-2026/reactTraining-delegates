import { redirect } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { RoleForm } from "@/components/RoleForm";
import { listUsers } from "@/lib/db";
import { can } from "@/lib/permissions";
import { getSession } from "@/lib/session";

export default async function AdminPage() {
  const user = await getSession();
  if (!user) redirect("/login");
  if (!can(user, "user:manage")) redirect("/board");

  const users = listUsers();

  return (
    <div className="stack">
      <NavBar user={user} />
      <h1>Manage users</h1>
      <p className="meta">A new role takes effect the next time that person logs in.</p>
      <table className="card">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td><code>{u.email}</code></td>
              <td>
                <RoleForm user={u} canChange={can(user, "user:manage", { type: "user", id: u.id })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
