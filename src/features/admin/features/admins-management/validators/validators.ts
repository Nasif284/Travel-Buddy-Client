import { z } from "zod";

export const CreateAdminSchema = z.object({
  fullName: z.string().min(4, "Full name must be at least 4 characters.").max(100, "Full name cannot exceed 100 characters.").trim(),
  email: z.email("Invalid email address format.").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase and one number."),
  role: z.enum(["Super Admin", "Analyst", "Moderator"], {
    error: "Invalid admin role.",
  }),
});
export type CreateAdminFormData = z.infer<typeof CreateAdminSchema>;


export const EditAdminSchema = z
  .object({
    role: z.string().optional(),
    status: z
      .object({
        statusCode: z.string().optional(),
        reason: z.string().trim().max(500, "Reason cannot exceed 500 characters.").optional(),
      })
      .optional(),

    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password cannot exceed 128 characters.")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase and one number.")
      .optional()
      .or(z.literal("")),

    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status?.statusCode === "Suspended" && !data.status.reason?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["status", "reason"],
        message: "Suspension reason is required.",
      });
    }

    if (data.password && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }
  });

export type EditAdminFormData = z.infer<typeof EditAdminSchema>;