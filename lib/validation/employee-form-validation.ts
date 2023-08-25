import * as z from 'zod';

export const EmployeeFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(40, {
      message: 'name must not be longer than 40 characters.',
    }),
  workEmail: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  position: z.string().max(30).min(4),
  workMobile: z.string().max(10),
  personalMobile: z.string().max(10),
  department: z.string().max(30),
  jobPosition: z.string().max(30),
  manager: z.string().max(30),
  profile_photo: z.string().url().nonempty(),
});

export type EmployeeFormValues = z.infer<typeof EmployeeFormSchema>;
