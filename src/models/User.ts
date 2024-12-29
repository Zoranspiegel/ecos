import { z } from 'zod';

export const AuthUserSchema = z
  .object({
    username: z.string().min(2, 'Username must contain at least 2 characters'),
    password: z.string(),
    confirm: z
      .string()
      .min(5, 'Password must contain at least 5 characters')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[\W_]/, 'Password must contain at least 1 special character')
      .optional()
  })
  .refine(
    (data) => {
      if (data.confirm) {
        return data.password === data.confirm;
      } else {
        return true;
      }
    },
    {
      message: 'Password and Confirm Password fields must match',
      path: ['confirm']
    }
  );
