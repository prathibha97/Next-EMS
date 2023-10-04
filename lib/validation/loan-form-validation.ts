import * as z from 'zod';

export const LoanFormSchema = z.object({
  amount: z.string().nonempty(),
  date: z.string().nonempty(),
  installments: z.string().nonempty(),
});

export type LoanFormValues = z.infer<typeof LoanFormSchema>;
