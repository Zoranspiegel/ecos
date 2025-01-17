import { getClient } from '@/db';
import { UsersSchema } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // SEARCH PARAMS
    const { searchParams } = request.nextUrl;

    const userSearch = searchParams.get('user_search');

    // SEARCH USERS BY NAME
    if (userSearch !== undefined) {
      // LIMIT & KEY WORD
      const LIMIT = 5;
      const keyWord = `%${userSearch}%`;

      // USERS SEARCH QUERY
      const client = getClient();
      await client.connect();

      const usersSearchRes = await client.query(
        `SELECT id, username, avatar, is_admin, created_at, updated_at FROM PUBLIC.users
        WHERE username ILIKE $1
        ORDER BY created_at DESC
        LIMIT $2`,
        [keyWord, LIMIT]
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
      return NextResponse.json(
        [],
        { status: 500 }
      );
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
