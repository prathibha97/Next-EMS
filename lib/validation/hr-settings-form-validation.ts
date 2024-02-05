import * as z from 'zod';

export const HRSettingsFormSchema = z.object({
  employeeNumber: z
    .string()
    .max(10, { message: 'Employee number must be less than 10 characters.' })
    .nonempty({ message: 'Employee number is required.' }),
  userId: z.string().nonempty({ message: 'Related user is required' }),
  idCopy: z.string().optional(),
  resumeCopy: z.string().optional(),
  passbookCopy: z.string().optional(),
  // employeeType: z.string().nonempty({ message: 'Employee type is required' }),
  basicSalary: z.string().nonempty({ message: 'Basic salary is required' }),
  dataAllowance: z.string().default('0'),
  mobileAllowance: z.string().default('0'),
  performanceAllowance: z.string().default('0'),
  medicalLeaves: z.string().default('0'),
  casualLeaves: z.string().default('0'),
  annualLeaves: z.string().default('0'),
  dutyLeaves: z.string().default('0'),
  unpaidLeaves: z.string().default('0'),
});

export type HRSettingsFormValues = z.infer<typeof HRSettingsFormSchema>;
