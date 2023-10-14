import * as z from 'zod';

const taskStatuses = [
  'Backlog',
  'Todo',
  'In_Progress',
  'Done',
  'Canceled',
] as const;

const taskPriority = ['Low', 'Medium', 'High'] as const;

export const TaskFormSchema = z.object({
  title: z.string(),
  status: z.enum([...taskStatuses]),
  priority: z.enum([...taskPriority]),
  project: z.string(),
  description: z.string(),
  label: z.string(),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
