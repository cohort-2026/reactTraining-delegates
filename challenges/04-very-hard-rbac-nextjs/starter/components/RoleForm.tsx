"use client";
import { useActionState } from "react";
import { changeRole } from "@/app/admin/actions";
import { initialState } from "@/lib/action-state";
import { ROLES, type User } from "@/lib/types";

export function RoleForm({ user, canChange }: { user: User; canChange: boolean }) {
  const [state, formAction, isPending] = useActionState(changeRole, initialState);

  return (
    <form action={formAction} className="row">
      <input type="hidden" name="userId" value={user.id} />
      <label htmlFor={`role-${user.id}`} className="visually-hidden">Role for {user.name}</label>
      <select id={`role-${user.id}`} name="role" defaultValue={user.role} disabled={!canChange}>
        {ROLES.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      {canChange ? <button disabled={isPending}>Save</button> : <span className="meta">(you)</span>}
      {state.error && <p role="alert" className="error">{state.error}</p>}
    </form>
  );
}
