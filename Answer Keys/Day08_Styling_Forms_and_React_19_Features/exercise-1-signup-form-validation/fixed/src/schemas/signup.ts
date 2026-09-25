import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password needs at least 8 characters"),
  teamSize: z.coerce
    .number()
    .int("Team size must be a whole number")
    .min(1, "Team size must be at least 1")
    .max(50, "Team size must be 50 or fewer"),
});

export type SignupInput = z.infer<typeof signupSchema>;
