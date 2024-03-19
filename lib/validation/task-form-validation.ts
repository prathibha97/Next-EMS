import * as z from 'zod';



const taskPriority = ['Low', 'Medium', 'High'] as const;

export const TaskFormSchema = z.object({
  title: z.string(),
  priority: z.enum([...taskPriority]),
  project: z.string(),
  description: z.string(),
  label: z.string(),
  assignee: z.string(),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
