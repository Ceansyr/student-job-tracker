import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().optional(),
  status: z.enum(['applied', 'interview', 'offer', 'rejected']).default('applied'),
  appliedDate: z.string().optional(), 
});
