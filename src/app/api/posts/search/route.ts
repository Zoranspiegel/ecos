import { getClient } from '@/db';
import { PostsSchema } from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // SEARCH PARAMS
    const { searchParams } = request.nextUrl;
    const content = `%${searchParams.get('content')}%`;

    // LIMIT, PAGE & OFFSET
    const LIMIT = 20;
    const page = Number(searchParams.get('page')) || 0;
    const offset = LIMIT * page;

    // SEARCH POSTS QUERY
    const client = getClient();
    await client.connect();

    const postsRes = await client.query(
      `SELECT u.username, u.avatar, u.is_admin, p.*,
      JSON_BUILD_OBJECT (
        'url', i.url,
        'width', i.width,
        'height', i.height
      ) AS img
      FROM public.posts p
      INNER JOIN public.users u ON p.user_id = u.id
      LEFT JOIN public.images i ON p.id = i.post_id
      WHERE p.content LIKE $1
      ORDER BY p.updated_at DESC
      LIMIT $2 OFFSET $3`,
      [content, LIMIT, offset]
    );

    await client.end();

    // ZOD PARSE
    const parseRes = PostsSchema.safeParse(postsRes.rows);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { data } = parseRes;

    // OK RESPONSE
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // ERROR LOG & RESPONSE
    if (error instanceof Error) {
      console.error(error.stack);      
    };
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}