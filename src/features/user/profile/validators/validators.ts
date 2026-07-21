import z from "zod";

export const phoneSchema = z.object({
  countryCode: z.string().min(1),
  phone: z
    .string()
    .min(6, "Enter a valid phone number")
    .max(15, "Phone number too long")
    .regex(/^[0-9\-\s()]+$/, "Only digits and - () allowed"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "Enter all 6 digits").regex(/^\d+$/, "OTP must be digits only"),
});

export type PhoneForm = z.infer<typeof phoneSchema>;
export type OtpForm = z.infer<typeof otpSchema>;