import * as z from 'zod';

export const LeaveFormSchema = z.object({
  type: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string(),
  medical: z.string().optional(),
  otherProof: z.string().optional(),
});

export type LeaveFormValues = z.infer<typeof LeaveFormSchema>;