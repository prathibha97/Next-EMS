import * as z from 'zod';

export const PayrollFormSchema = z.object({
  month: z.string().max(50),
  year: z.string().max(50),
  basicSalary: z.number(),
  dataAllowance: z.number(),
  mobileAllowance: z.number(),
  projectAllowance: z.number(),
  performanceAllowance: z.number(),
  holidayAllowance: z.number(),
  salaryAdvance: z.number(),
  epfDeduction: z.number(),
  otherDeductions: z.number(),
});

export type PayrollFormValues = z.infer<typeof PayrollFormSchema>;
