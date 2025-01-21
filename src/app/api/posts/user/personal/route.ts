import { getClient } from '@/db';
import { PostsSchema } from '@/models/Post';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import env from '@/env';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // LOGGED IN USER ID
    const cookieStore = request.cookies;
    const cookie = cookieStore.get('jwt-token');

    if (!cookie?.value) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }
    
    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);
    
    const { payload } = await jwtVerify(token, jwtSecret);
    
    if (!payload?.sub) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    const userID = (JSON.parse(payload.sub)).id;

    // SEARCH PARAMS
    const { searchParams } = request.nextUrl;

    // PAGE, LIMIT & OFFSET
    const LIMIT = 10;
    const page = Number(searchParams.get('page')) || 0;
    const offset = page * LIMIT;

    // POSTS BY USER ID QUERY
    const client = getClient();
    await client.connect();

    const postsByUserIDRes = await client.query(
      `SELECT U.username, U.avatar, U.is_admin, P.* FROM PUBLIC.posts P
      INNER JOIN PUBLIC.users U ON P.user_id = U.id
      WHERE U.id = $1
      ORDER BY P.updated_at DESC
      LIMIT $2 OFFSET $3`,
      [userID, LIMIT, offset]
    );

    await client.end();

    const parseRes = PostsSchema.safeParse(postsByUserIDRes.rows);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { data } = parseRes;

    return NextResponse.json(data, { status: 200 });
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
