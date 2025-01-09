import { Client } from 'pg';
import env from '@/env';

export function getClient(): Client {
  // LOCAL POSTGRES DATABASE
  if (env.PG_USER) {
    const client = new Client({
      user: env.PG_USER,
      host: env.PG_HOST,
      password: env.PG_PASSWORD,
      database: env.PG_DB,
      port: env.PG_PORT
    });

    return client;
  } else {
    // PRODUCTION POSTGRES DATABASE
    const client = new Client(env.POSTGRES_URL);

    return client;
  }
}
