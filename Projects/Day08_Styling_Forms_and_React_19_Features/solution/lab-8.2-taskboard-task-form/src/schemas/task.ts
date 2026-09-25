import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim()
    .min(3, "Title needs at least 3 characters")
    .max(80, "Keep titles under 80 characters"),
  status: z.enum(["todo", "doing", "done"]),
  points: z.coerce.number().int().min(1).max(13),
  assignee: z.string().optional(),
});

// What the form holds before validation (points can be any value)
export type TaskFormValues = z.input<typeof taskSchema>;
// What you get after validation (points is a number)
export type TaskInput = z.infer<typeof taskSchema>;

// Tasks from the API also have an id, tags and a project
export const apiTaskSchema = taskSchema.extend({
  id: z.string(),
  tags: z.array(z.string()).default([]),
  projectId: z.string(),
});
