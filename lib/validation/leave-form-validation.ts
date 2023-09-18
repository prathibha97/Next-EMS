import * as z from 'zod';

export const LeaveFormSchema = z.object({
  type: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string(),
  medical: z.string().optional(),
});

export type LeaveFormValues = z.infer<typeof LeaveFormSchema>;