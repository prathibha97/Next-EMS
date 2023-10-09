import * as z from 'zod';

export const MeetingFormSchema = z.object({
  summary: z.string(),
  startDatetime: z.string(),
  endDatetime: z.string(),
  attendee: z.array(z.string()),
});

export type MeetingFormValues = z.infer<typeof MeetingFormSchema>;