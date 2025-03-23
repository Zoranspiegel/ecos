CREATE EXTENSION IF NOT EXISTS CITEXT;
CREATE TABLE IF NOT EXISTS PUBLIC.users (
  id BIGSERIAL PRIMARY KEY,
  username CITEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  avatar TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS PUBLIC.posts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES PUBLIC.users (id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS PUBLIC.follows (
  user_id BIGINT REFERENCES PUBLIC.users (id),
  follower_id BIGINT REFERENCES PUBLIC.users (id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, follower_id)
);
CREATE INDEX posts_user_id_index ON PUBLIC.posts (user_id);
CREATE INDEX follows_user_id_index ON PUBLIC.follows (user_id);
CREATE INDEX follows_follower_id_index ON PUBLIC.follows (follower_id);