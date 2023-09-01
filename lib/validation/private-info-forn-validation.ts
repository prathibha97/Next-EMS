import * as z from 'zod';

export const PrivateInfoFormSchema = z.object({
  privateAddress: z
    .string()
    .min(1, 'Private address is required')
    .max(255, 'Private address is too long'),
  personalEmail: z
    .string()
    .email('Invalid email address')
    .min(1, 'Personal email is required')
    .max(75, 'Personal email is too long'),
  phone: z
    .string()
    .min(1, 'Personal phone number is required')
    .max(10, 'Personal phone is too long'),
  bankAccountNumber: z
    .string()
    .min(1, 'Bank account number is required')
    .max(50, 'Bank account number is too long'),
  bankName: z
    .string()
    .min(1, 'Bank name is required')
    .max(50, 'Bank name is too long'),
  emergencyContactName: z
    .string()
    .min(1, 'Emergency contact name is required')
    .max(50, 'Emergency contact name is too long'),
  emergencyContactPhone: z
    .string()
    .min(1, 'Emergency contact phone is required')
    .max(10, 'Emergency contact phone is too long'),
  maritalStatus: z.string().optional(),
  numberOfDependents: z
    .number()
    .int()
    .min(0, 'Number of dependents must be greater than or equal to 0')
    .max(10, 'Number of dependents must be less than or equal to 10')
    .optional(),
  nationality: z.string().optional(),
  idNumber: z
    .string()
    .min(1, 'ID number is required')
    .max(15, 'ID number is too long')
    .optional(),
  gender: z.string().optional(),
  dateOfBirth: z.date(),
});

export type PrivateInfoFormValues = z.infer<typeof PrivateInfoFormSchema>;
