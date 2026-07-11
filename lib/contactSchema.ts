import { z } from "zod";

export const preferredTimeOptions = ["Morning", "Afternoon", "Evening", "Weekend"] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Please keep this under 100 characters."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number.")
    .regex(/^[0-9()+\-.\s]+$/, "Please enter a valid phone number."),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address."),
  dogBreed: z.string().trim().min(2, "Please enter your dog's breed.").max(60, "Please keep this under 60 characters."),
  dogAge: z.string().trim().min(1, "Please enter your dog's age.").max(30, "Please keep this under 30 characters."),
  problem: z
    .string()
    .trim()
    .min(10, "Please tell us a bit more (at least 10 characters).")
    .max(1000, "Please keep this under 1000 characters."),
  preferredTime: z.enum(preferredTimeOptions, "Please select a preferred time."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
