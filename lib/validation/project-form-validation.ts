import * as z from 'zod';

const projectStatuses = [
  'ACTIVE',
  'INACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED',
] as const;

export const ProjectFormSchema = z.object({
  name: z
    .string()
    .max(70, { message: 'Project name must be less than 70 characters.' })
    .nonempty({ message: 'Project name is required.' }),
  startDate: z.string(),
  endDate: z.string(),
  category: z.string(),
  status: z.enum([...projectStatuses]),
  clientId: z.string(),
  employees: z.array(z.string()),
  projectScope: z.string(),
  designLink: z.string(),
  specialNotes: z.string(),
  nftCollectionSize: z.string(),
  nftTraitCount: z.string(),
  nftBaseDesignCount: z.string(),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
