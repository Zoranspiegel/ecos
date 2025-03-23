import { getClient } from '@/db';
import { PostsSchema } from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ userID: string }> }): Promise<NextResponse> {
  try {
    // CHECK USER ID ROUTE PARAM
    const { userID } = await params;

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
      `SELECT U.username, U.avatar, U.is_admin, P.*,
      JSON_BUILD_OBJECT (
        'url', i.url,
        'width', i.width,
        'height', i.height
      ) AS img
      FROM PUBLIC.posts P
      INNER JOIN PUBLIC.users U ON P.user_id = U.id
      LEFT JOIN public.images i ON p.id = i.post_id
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
