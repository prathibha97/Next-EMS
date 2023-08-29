import * as z from 'zod';

export const HRSettingsFormSchema = z.object({
  employeeType: z
    .string({
      required_error: 'Please select an employee type.',
    })
    .nonempty({ message: 'Employee type is required' }),
  userId: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .nonempty({ message: 'Related user is required' }),
  idCopy: z.string().optional(),
  resumeCopy: z.string().optional(),
  passbookCopy: z.string().optional(),
});

export type HRSettingsFormValues = z.infer<typeof HRSettingsFormSchema>;
