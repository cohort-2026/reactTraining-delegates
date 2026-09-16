import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim()
    .min(3, "Title needs at least 3 characters")
    .max(80, "Keep titles under 80 characters"),
  status: z.enum(["todo", "doing", "done"]),
  points: z.coerce.number().int().min(1).max(13),
});

export type TaskInput = z.infer<typeof taskSchema>;
