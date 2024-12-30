import { Client } from 'pg';
import env from '@/env';

// LOCAL POSTGRES DATABASE

export function getClient(): Client {
  const client = new Client({
    user: env.PG_USER,
    host: env.PG_HOST,
    password: env.PG_PASSWORD,
    database: env.PG_DB,
    port: env.PG_PORT
  });

  return client;
}

// PRODUCTION POSTGRES DATABASE

// export function getClient(): Client {
//   const client = new Client(env.POSTGRES_URL);

//   return client;
// }
