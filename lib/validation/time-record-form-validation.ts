import * as z from 'zod';

export const TimeRecordFormSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  date: z.string(),
  description: z.string(),
  taskId: z.string(),
  projectId: z.string(),
});

export type TimeRecordFormValues = z.infer<typeof TimeRecordFormSchema>;

