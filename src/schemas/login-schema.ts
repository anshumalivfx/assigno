import z from "zod";

export const loginSchema = z.object({
  username: z.string({ message: "Invalid Admin username" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;