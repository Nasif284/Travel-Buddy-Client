import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.email("Enter a valid email address"),

  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
