import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/db';
import { UsersSchema } from '@/models/User';
import { jwtVerify } from 'jose';
import env from '@/env';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // SEARCH PARAMS
    const { searchParams } = request.nextUrl;

    const userSearch = searchParams.get('user_search');

    // SEARCH USERS BY NAME
    // - - - - - - - - - - - 
    if (userSearch !== undefined) {
      // GET LOGGED IN USER ID
      const cookiestore = request.cookies;

      const cookie = cookiestore.get('jwt-token');

      if (!cookie?.value) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
      }

      const token = cookie.value;
      const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

      const { payload } = await jwtVerify(token, jwtSecret);

      if (!payload.sub) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
      }

      const { id } = JSON.parse(payload.sub);

      // LIMIT & KEY WORD
      const LIMIT = 5;
      const keyWord = `%${userSearch}%`;

      // USERS SEARCH QUERY
      const client = getClient();
      await client.connect();

      const usersSearchRes = await client.query(
        `SELECT id, username, avatar, is_admin, created_at, updated_at FROM PUBLIC.users
        WHERE username LIKE $1
        AND id != $2
        ORDER BY created_at DESC
        LIMIT $3`,
        [keyWord, id, LIMIT]
      );

      await client.end();

      // ZOD PARSE
      const parseRes = UsersSchema.safeParse(usersSearchRes.rows);

      if (!parseRes.success) {
        throw new Error(parseRes.error.message);
      }

      const { data } = parseRes;

      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json([], { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
