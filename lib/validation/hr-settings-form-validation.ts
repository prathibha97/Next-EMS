import * as z from 'zod';

export const HRSettingsFormSchema = z.object({
  employeeType: z.string().nonempty({ message: 'Employee type is required' }),
  relatedUser: z.string().nonempty({ message: 'Related user is required' }),
  idCopy: z.string().optional(),
  resumeCopy: z.string().optional(),
  passbookCopy: z.string().optional(),
});

export type HRSettingsFormValues = z.infer<typeof HRSettingsFormSchema>;
