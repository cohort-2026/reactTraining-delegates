import { z } from "zod";
import { ROLES, TASK_STATUSES } from "@/lib/types";

export const roleSchema = z.enum(ROLES);
export const taskStatusSchema = z.enum(TASK_STATUSES);

// TODO: write Zod schemas for everything that arrives from the outside world.
// Suggested names (none of them exist yet):
//
//   loginSchema          email (trimmed, lower-case, a valid email) and password
//   createTaskSchema     title (trimmed, 3–120 characters) and status (default "todo")
//   updateTaskSchema     id and title
//   moveTaskSchema       id and status
//   taskIdSchema         id
//   changeRoleSchema     userId and role
//   sessionClaimsSchema  sub, name and role: the claims inside a verified JWT
//
// Tip: z.object() drops keys it does not know, so a `createdBy` or `role`
// field smuggled into a form never reaches your code.
