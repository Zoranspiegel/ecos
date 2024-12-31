DROP INDEX IF EXISTS follows_follower_id_index;
DROP INDEX IF EXISTS follows_user_id_index;
DROP INDEX IF EXISTS posts_user_id_index;
DROP TABLE IF EXISTS public.follows;
DROP TABLE IF EXISTS public.posts;
DROP TABLE IF EXISTS public.users;
DROP EXTENSION IF EXISTS citext;