CREATE TABLE IF NOT EXISTS PUBLIC.images (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT UNIQUE REFERENCES PUBLIC.posts(id) ON DELETE CASCADE,
  url VARCHAR(300) UNIQUE NOT NULL,
  width INT NOT NULL,
  height INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX images_post_id_index ON PUBLIC.images (post_id);