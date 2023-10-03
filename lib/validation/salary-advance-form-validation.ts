import * as z from 'zod';

export const SalaryAdvanceFormSchema = z.object({
  amount: z.string().nonempty(),
  date: z.string().nonempty(),
});

export type SalaryAdvanceFormValues = z.infer<typeof SalaryAdvanceFormSchema>;
