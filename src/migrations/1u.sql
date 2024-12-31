CREATE EXTENSION IF NOT EXISTS citext;
CREATE TABLE IF NOT EXISTS public.users (
  id bigserial PRIMARY KEY,
  username citext NOT NULL UNIQUE,
  password text NOT NULL,
  avatar text,
  is_admin boolean DEFAULT FALSE,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.posts (
  id bigserial PRIMARY KEY,
  user_id bigint REFERENCES public.users (id),
  content text NOT NULL,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.follows (
  user_id bigint REFERENCES public.users (id),
  follower_id bigint REFERENCES public.users (id),
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  UNIQUE (user_id, follower_id)
);
CREATE INDEX posts_user_id_index ON public.posts (user_id);
CREATE INDEX follows_user_id_index ON public.follows (user_id);
CREATE INDEX follows_follower_id_index ON public.follows (follower_id);