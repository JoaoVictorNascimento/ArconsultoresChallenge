import * as z from "zod";

export const transactionSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Value must be a positive number",
    }),
  description: z
    .string()
    .min(1, "Description is required")
    .min(3, "Description must be at least 3 characters long"),
});
