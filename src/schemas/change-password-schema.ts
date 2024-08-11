import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, { message: "Password is too short" }),
    newPassword: z.string().min(6, { message: "Password is too short" }),
    confirmPassword: z.string().min(6, { message: "Password is too short" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
