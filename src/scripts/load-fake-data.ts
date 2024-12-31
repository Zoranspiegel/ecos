import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { getClient } from '@/db';

async function loadFakeData(numUsers: number): Promise<void> {
  console.log(`🧞 Loading ${numUsers} fake users...`);

  const client = getClient();
  await client.connect();

  try {
    await client.query('begin');
    // FAKE USERS
    for (let i = 0; i < numUsers; i++) {
      const saltOrRounds = 10;
      const defaultPassword = 'password12345';
      const hash = bcrypt.hashSync(defaultPassword, saltOrRounds);

      await client.query(
        'insert into users (username, password, avatar) values ($1, $2, $3)',
        [faker.internet.username(), hash, faker.image.avatarGitHub()]
      );
    }

    const newUsersRes = await client.query(
      'select id from users order by created_at desc limit $1',
      [numUsers]
    );

    // FAKE POSTS
    for (const row of newUsersRes.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 40) + 10; i++) {
        const content =
          Math.random() < 0.5
            ? faker.lorem.sentence()
            : faker.lorem.paragraph();
        await client.query(
          'insert into posts (user_id, content) values ($1, $2)',
          [row.id, content]
        );
      }
    }

    // FAKE FOLLOWS
    for (const row1 of newUsersRes.rows) {
      for (const row2 of newUsersRes.rows) {
        if (row1.id !== row2.id) {
          if (Math.random() < 0.5) {
            await client.query(
              'insert into follows (user_id, follower_id) values ($1, $2)',
              [row1.id, row2.id]
            );
          }
        }
      }
    }

    await client.query('commit');

    console.log('🧞 Success');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const numUsers = Number(process.argv[2]) || 20;
loadFakeData(numUsers).catch((error) => {
  console.error(error);
});
