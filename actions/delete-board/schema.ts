import { z } from 'zod';

export const DeleteBoard = z.object({
  id: z.string(),
  projectId: z.string(),
});
