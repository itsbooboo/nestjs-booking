import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  roles: z.array(z.enum(['user', 'owner', 'admin'])).default(['user']),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
