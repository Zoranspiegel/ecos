import { cleanEnv, str, num } from 'envalid';

// ONLY_FOR_FAKE_DATA
// import { loadEnvConfig } from '@next/env';
// const appDir = process.cwd();
// loadEnvConfig(appDir);

const env = cleanEnv(process.env, {
  JWT_SECRET: str(),
  PG_USER: str(),
  PG_PASSWORD: str(),
  PG_HOST: str(),
  PG_DB: str(),
  PG_PORT: num(),
  POSTGRES_URL: str()
});

export default env;
