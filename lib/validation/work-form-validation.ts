import * as z from 'zod';

export const WorkInfoFormSchema = z.object({
  workAddress: z.string().max(50),
  workLocation: z.string().max(50),
  workingHours: z.string().max(50),
  startDate: z.string().max(20),
  timeZone: z.string().max(20),
});

export type WorkInfoFormValues = z.infer<typeof WorkInfoFormSchema>;
