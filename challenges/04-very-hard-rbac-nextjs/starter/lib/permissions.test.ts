import { describe, expect, it } from "vitest";
import { ACTIONS, can, type Action, type Resource } from "@/lib/permissions";
import type { Role } from "@/lib/types";

const ME = { admin: "u-admin", editor: "u-editor", viewer: "u-viewer" } as const;

// Which thing the action is performed on, relative to the person doing it.
type Target = "nothing" | "own task" | "someone else's task" | "themselves" | "another user";

function resourceFor(role: Role, target: Target): Resource | undefined {
  switch (target) {
    case "nothing": return undefined;
    case "own task": return { type: "task", ownerId: ME[role] };
    case "someone else's task": return { type: "task", ownerId: "u-somebody-else" };
    case "themselves": return { type: "user", id: ME[role] };
    case "another user": return { type: "user", id: "u-somebody-else" };
  }
}

// The permission matrix from the README, one row per case.
//            action          target                  admin  editor viewer
const MATRIX: Array<[Action, Target, boolean, boolean, boolean]> = [
  ["task:read",   "nothing",              true,  true,  true],
  ["task:create", "nothing",              true,  true,  false],
  ["task:update", "own task",             true,  true,  false],
  ["task:update", "someone else's task",  true,  true,  false],
  ["task:move",   "own task",             true,  true,  false],
  ["task:move",   "someone else's task",  true,  true,  false],
  ["task:delete", "own task",             true,  true,  false],
  ["task:delete", "someone else's task",  true,  false, false],
  ["task:delete", "nothing",              false, false, false], // fail closed: no task, no delete
  ["user:manage", "nothing",              true,  false, false], // may open the admin page
  ["user:manage", "another user",         true,  false, false],
  ["user:manage", "themselves",           false, false, false], // nobody changes their own role
];

const ROWS = MATRIX.flatMap(([action, target, admin, editor, viewer]) =>
  ([["admin", admin], ["editor", editor], ["viewer", viewer]] as const).map(
    ([role, expected]) => ({ role, action, target, expected }),
  ),
);

describe("can(): the permission matrix", () => {
  it.each(ROWS)(
    "$role → $action on $target → $expected",
    ({ role, action, target, expected }) => {
      const user = { id: ME[role], role };
      expect(can(user, action, resourceFor(role, target))).toBe(expected);
    },
  );

  it("covers every action", () => {
    const tested = new Set(MATRIX.map(([action]) => action));
    expect([...tested].sort()).toEqual([...ACTIONS].sort());
  });
});

describe("can(): fails closed", () => {
  it.each(ACTIONS)("denies %s when nobody is signed in", (action) => {
    expect(can(null, action)).toBe(false);
    expect(can(undefined, action, { type: "task", ownerId: "u-admin" })).toBe(false);
  });

  it.each(["superadmin", "Admin", "", "__proto__", "constructor", "toString"])(
    "denies everything to an unknown role %j",
    (role) => {
      const user = { id: "u-admin", role: role as Role };
      for (const action of ACTIONS) {
        expect(can(user, action)).toBe(false);
        expect(can(user, action, { type: "task", ownerId: "u-admin" })).toBe(false);
      }
    },
  );

  it("denies an unknown action, even to an admin", () => {
    const admin = { id: "u-admin", role: "admin" as const };
    expect(can(admin, "task:destroy-everything" as Action)).toBe(false);
    expect(can(admin, "toString" as Action)).toBe(false);
  });

  it("does not let a task-owner check pass for a user resource", () => {
    const editor = { id: "u-editor", role: "editor" as const };
    expect(can(editor, "task:delete", { type: "user", id: "u-editor" })).toBe(false);
  });
});
