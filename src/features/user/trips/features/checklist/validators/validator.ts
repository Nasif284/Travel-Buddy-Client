import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim().min(3, "Task name must be at least 3 characters").max(100),
  categoryCode: z.string().min(1, "Select a category"),
  priorityCode: z.string().min(1, "Select a category"),
  assignedTo: z.string().min(1, "Select a category"),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export type TaskFormData = z.infer<typeof taskSchema>;
