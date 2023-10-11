import * as z from 'zod';

export const ClientFormSchema = z.object({
  name: z
    .string()
    .max(50, { message: 'Client name must be less than 50 characters.' })
    .nonempty({ message: 'Client name is required.' }),
  email: z.string().email().nonempty({ message: 'Client email is required' }),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof ClientFormSchema>;
