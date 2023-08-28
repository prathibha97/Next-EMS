import * as z from 'zod';

export const DepartmentFormSchema = z.object({
  name: z.string().max(50).nonempty({
    message: 'Department name is required',
  }),
  description: z.string().max(50).optional(),
  manager: z.string().max(50).optional(),
  parentDepartment: z.string().max(50).optional(),
  employees: z.array(z.string().max(50)).optional(),
});

export type DepartmentFormValues = z.infer<typeof DepartmentFormSchema>;
