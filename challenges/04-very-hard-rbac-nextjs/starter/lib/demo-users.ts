import type { User } from "@/lib/types";

// Demo accounts, one per role. The password is shown on the login page,
// so this file is safe to import from Client Components.
export const DEMO_PASSWORD = "password123";

export const DEMO_USERS: User[] = [
  { id: "u-admin", name: "Ada Admin", email: "admin@example.com", role: "admin" },
  { id: "u-editor", name: "Eddie Editor", email: "editor@example.com", role: "editor" },
  { id: "u-viewer", name: "Vera Viewer", email: "viewer@example.com", role: "viewer" },
];
