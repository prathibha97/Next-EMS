import * as z from 'zod';

export const HRSettingsFormSchema = z.object({
  employeeNumber: z
    .string({
      required_error: 'Employee number is required.',
    })
    .max(10, { message: 'Employee number must be less than 10 characters.' }),
  userId: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .nonempty({ message: 'Related user is required' }),
  idCopy: z.string().optional(),
  resumeCopy: z.string().optional(),
  passbookCopy: z.string().optional(),
  employeeType: z.string()
});

export type HRSettingsFormValues = z.infer<typeof HRSettingsFormSchema>;
