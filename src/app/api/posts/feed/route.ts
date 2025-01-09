import { getClient } from '@/db';
import env from '@/env';
import { PostsSchema } from '@/models/Post';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // LIMIT, PAGE & OFFSET SETTING
    const { searchParams } = request.nextUrl;

    const LIMIT = 10;
    const page = Number(searchParams.get('page')) || 0;
    const offset = page * LIMIT;
    
    // JWT ON COOKIE CHECK
    const cookie = request.cookies.get('jwt-token');

    if (!cookie?.value) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }

    // JWT TOKEN JOSE VERIFICATION
    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload.sub) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }

    // FEED POSTS QUERY
    const { id } = JSON.parse(payload.sub);

    const client = getClient();
    await client.connect();

    const postsRes = await client.query(
      `SELECT u.username, u.avatar, p.* FROM public.posts p
      INNER JOIN public.users u ON p.user_id = u.id
      WHERE p.user_id  IN (
        SELECT f.user_id FROM public.follows f
        WHERE f.follower_id = $1
      )
      ORDER BY p.updated_at DESC
      LIMIT $2 OFFSET $3`,
      [id, LIMIT, offset]
    );

    await client.end();

    // POSTS ZOD SCHEMA PARSING & OK RESPONSE
    const data = PostsSchema.parse(postsRes.rows);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // ERROR LOG & RESPONSE
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
