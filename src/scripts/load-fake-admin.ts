import bcrypt from 'bcrypt';
import { getClient } from '@/db';

async function loadFakeAdmin (username: string): Promise<void> {
  if (!username) throw new Error('MISSING_USERNAME_FIELD');

  console.log(`🧞 Loading fake admin user ${username}...`);

  const client = getClient();
  await client.connect();

  try {
    await client.query('begin');

    const userExistsRes = await client.query(
      'select id from users where username ilike $1',
      [username]
    );

    if (userExistsRes.rowCount) throw new Error('USERNAME_ALREADY_TAKEN');

    const saltOrRounds = 10;
    const defaultPassword = 'password12345';
    const hash = await bcrypt.hash(defaultPassword, saltOrRounds);

    await client.query(
      'insert into users (username, password, is_admin) values ($1, $2, $3)',
      [username, hash, true]
    );

    await client.query('commit');

    console.log('🧞 Success');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const username = process.argv[2];

loadFakeAdmin(username)
  .catch(error => { console.error(error.message); });
