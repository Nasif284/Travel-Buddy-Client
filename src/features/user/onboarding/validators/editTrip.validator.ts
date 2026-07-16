import { z } from "zod";

export const editTripSchema = z
  .object({
    dateFrom: z.string().min(1, "Departure date is required"),
    dateTo: z.string().min(1, "Return date is required"),
    budgetStyle: z.string(),
    travelStyleCode: z.string(),
  })
  .refine((data) => new Date(data.dateTo) > new Date(data.dateFrom), {
    path: ["dateTo"],
    message: "Return date must be after departure date",
  });

export type EditTripFormData = z.infer<typeof editTripSchema>;
