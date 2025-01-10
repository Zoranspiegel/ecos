import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { getClient } from '@/db';


async function loadFakeData(): Promise<void> {
  const customUsers: { username: string, avatar: string }[] = [
    {
      username: 'Zoranbow',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736463470/Profile%20Images/Ecos/bauhaus-eye-with-geometry-background-vector-41448026_yolwed.jpg'
    },
    {
      username: 'Lichstrahl',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736463913/Profile%20Images/Ecos/Bauhaus-Cubic-Face-Portrait-Propaganda-Movie-Poster-72856737-1_opsh9y.png'
    },
    {
      username: 'Noir Chat',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736464023/Profile%20Images/Ecos/611w7Tn9ELL_wvxets.jpg'
    },
    {
      username: 'Gridson',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736464373/Profile%20Images/Ecos/bhavatar_uhjvsm.jpg'
    },
    {
      username: 'Geomatrix',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736464793/Profile%20Images/Ecos/Bauhaus-Cubic-Face-Portrait-Propaganda-Movie-Poster-72855391-1_zfvejw.png'
    },
    {
      username: 'Lydian',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736465199/Profile%20Images/Ecos/61K8mcjv5LL._AC_SL1500__yexr1t.jpg'
    },
    {
      username: 'Farbenspiel',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736466547/Profile%20Images/Ecos/bhavtrman_ojmcyv.jpg'
    },
    {
      username: 'Linspace',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736466760/Profile%20Images/Ecos/whtbhavtr_rqfswh.jpg'
    },
    {
      username: 'Dimensione',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736466854/Profile%20Images/Ecos/orngbhavtr_akwmax.jpg'
    },
    {
      username: 'Modulus',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736467017/Profile%20Images/Ecos/fcblcjbhvtr_c1sczf.png'
    },
    {
      username: 'Curveaux',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736467128/Profile%20Images/Ecos/dblfcbhavtr_bexo0k.jpg'
    },
    {
      username: 'Monochrom',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736467347/Profile%20Images/Ecos/Bauhaus-Cubic-Face-Portrait-Propaganda-Movie-Poster-72856800-1_nilpfn.png'
    },
    {
      username: 'Winkel',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736467471/Profile%20Images/Ecos/blhavtr_bwfpjm.png'
    },
    {
      username: 'Polygonova',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736473102/Profile%20Images/Ecos/YV9oZmxpcA_bslbxn.jpg'
    },
    {
      username: 'Symmetrik',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736475383/Profile%20Images/Ecos/clwnbhavtr_xgfp7j.png'
    },
    {
      username: 'Formwandler',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736476681/Profile%20Images/Ecos/15_MARIONETTE_3_x9hci3.jpg'
    },
    {
      username: 'Constructiv',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736481156/Profile%20Images/Ecos/4881239-HSC00001-32_tmczvl.jpg'
    },
    {
      username: 'Ocasis',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736481504/Profile%20Images/Ecos/wmnbhclorsavtr_raa8uw.jpg'
    },
    {
      username: 'Cubic Jazz',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736522089/Profile%20Images/Ecos/jazz-concert-generative-ai-bauhaus-style-background_87646-22440_p8bpq2.jpg'
    },
    {
      username: 'Rasterberg',
      avatar: 'https://res.cloudinary.com/dkc8xrlg8/image/upload/v1736522572/Profile%20Images/Ecos/Y19wYWQsd183MDA_vdo2ol.jpg'
    }
  ];

  console.log(`🧞 Loading ${customUsers.length} custom users...`);

  const client = getClient();
  await client.connect();

  try {
    await client.query('begin');
    // FAKE USERS
    for (let i = 0; i < customUsers.length; i++) {
      const saltOrRounds = 10;
      const defaultPassword = '?Password12345';
      const hash = bcrypt.hashSync(defaultPassword, saltOrRounds);

      await client.query(
        'insert into users (username, password, avatar) values ($1, $2, $3)',
        [customUsers[i].username, hash, customUsers[i].avatar]
      );
    }

    const newUsersRes = await client.query(
      'select id from users order by created_at desc limit $1',
      [customUsers.length]
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

loadFakeData().catch((error) => {
  console.error(error);
});
