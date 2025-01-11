import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  username: z.string(),
  avatar: z.string().url().nullable(),
  is_admin: z.boolean(),
  content: z.string(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date())
});

export const PostsSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;