import { z } from 'zod';

export const createBookSchema = z.object({
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val)),
  unitId: z.string().min(1, 'Unit ID is required'),
  invoiceId: z.string().min(1, 'Invoice ID is required'),
});

export const updateBookSchema = createBookSchema.partial();

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UpdateBookDto = z.infer<typeof updateBookSchema>;
