import { z } from 'zod';

export const FollowsUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().url(),
  is_admin: z.boolean(),
  created_at: z.string().or(z.date()),
  followed_back: z.boolean().optional()
});

export const FollowsUsersSchema = z.array(FollowsUserSchema);

export type FollowsUser = z.infer<typeof FollowsUserSchema>
