import * as z from 'zod';

export const PayrollFormSchema = z.object({
  // month: z.string().max(50),
  // year: z.string().max(50),
  monthYear: z.string().max(50),
  basicSalary: z.string(),
  dataAllowance: z.string(),
  mobileAllowance: z.string(),
  projectAllowance: z.string(),
  performanceAllowance: z.string(),
  holidayAllowance: z.string(),
  salaryAdvance: z.string(),
  epfDeduction: z.string(),
  otherDeductions: z.string(),
});

export type PayrollFormValues = z.infer<typeof PayrollFormSchema>;
