import { cleanEnv, str, num } from "envalid";

// ONLY_FOR_FAKE_DATA
// import { loadEnvConfig } from '@next/env';
// const appDir = process.cwd();
// loadEnvConfig(appDir);

const env = cleanEnv(process.env, {
  JWT_SECRET: str(),
  PG_USER: str({ default: "" }),
  PG_PASSWORD: str({ default: "" }),
  PG_HOST: str({ default: "" }),
  PG_DB: str({ default: "" }),
  PG_PORT: num({ default: 0 }),
  POSTGRES_URL: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str()
});

export default env;
