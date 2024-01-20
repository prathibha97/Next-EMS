import * as z from 'zod';

export const PayrollFormSchema = z.object({
  monthYear: z.string().max(50),
  basicSalary: z.string(),
  dataAllowance: z.string(),
  mobileAllowance: z.string(),
  projectAllowance: z.string(),
  performanceAllowance: z.string(),
  holidayAllowance: z.string(),
  salaryAdvance: z.string().optional(),
  epfDeduction: z.string(),
  otherDeductions: z.string(),
  workingDays: z.string(),
  paidDays: z.string(),
});

export type PayrollFormValues = z.infer<typeof PayrollFormSchema>;
