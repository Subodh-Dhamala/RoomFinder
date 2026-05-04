import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),

  bio: z.string().optional(),

  phone: z
    .string()
    .regex(/^(\+977)?(98|97)\d{8}$/, "Invalid phone number")
    .optional(),

  social: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
    })
    .optional(),
})