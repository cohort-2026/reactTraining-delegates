import type { SessionUser } from "@/lib/types";

export const ACTIONS = [
  "task:read",
  "task:create",
  "task:update",
  "task:move",
  "task:delete",
  "user:manage",
] as const;
export type Action = (typeof ACTIONS)[number];

/** The thing an action is performed on, when the rule depends on it. */
export type Resource =
  | { type: "task"; ownerId: string }
  | { type: "user"; id: string };

type Actor = Pick<SessionUser, "id" | "role">;

/**
 * The single place that decides who may do what.
 * Every page, Server Action, route handler and the proxy asks this function.
 *
 * Implement the permission matrix from the README. Rules of thumb:
 *   - Deny by default: anything you did not explicitly allow is false.
 *   - No user, an unknown role or an unknown action: false.
 *   - Rules that depend on a resource (deleting a task, changing a user's
 *     role) are false when the resource is missing or is the wrong type.
 */
export function can(
  user: Actor | null | undefined,
  action: Action,
  resource?: Resource,
): boolean {
  // TODO: replace this with the real policy.
  void user;
  void action;
  void resource;
  return false;
}
