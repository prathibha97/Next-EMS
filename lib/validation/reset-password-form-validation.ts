import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const ResetPasswordFormSchema = z
  .object({
    password: z.string().optional(),
    newPassword: z.string().min(1).regex(passwordValidation, {
      message:
        'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordFormSchema>;
