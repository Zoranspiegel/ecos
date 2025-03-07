import { getClient } from "@/db";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { FollowsUsersSchema } from "@/models/Follows";
import env from "@/env";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // LIMIT, PAGE & OFFSET SETTING
    const { searchParams } = request.nextUrl;

    const LIMIT = 9;
    const page = Number(searchParams.get('page')) || 0;
    const offset = page * LIMIT;

    // JWT ON COOKIE CHECK
    const cookie = request.cookies.get('jwt-token');

    if (!cookie?.value) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }
    
    // JWT TOKEN JOSE VERIFICATION
    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);
    
    const { payload } = await jwtVerify(token,jwtSecret);
    
    if (!payload?.sub) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );      
    }

    // FOLLWING USERS QUERY
    const { id } = JSON.parse(payload.sub);

    const client = getClient();
    await client.connect();

    const followersRes = await client.query(
      `SELECT U.id, U.username, U.avatar, U.is_admin, F1.created_at,
      EXISTS (
        SELECT 1 FROM PUBLIC.follows F2
        WHERE F2.user_id = F1.follower_id
        AND F2.follower_id = F1.user_id
      ) AS followed_back
      FROM PUBLIC.follows F1
      INNER JOIN PUBLIC.users U ON F1.follower_id = U.id
      WHERE F1.user_id = $1
      ORDER BY F1.created_at DESC
      LIMIT $2 OFFSET $3`,
      [id, LIMIT, offset]
    );

    await client.end();

    // FOLLOWING USER ZOD SCHEMA PARSING & OK RESPONSE
    const data = FollowsUsersSchema.parse(followersRes.rows);

    return NextResponse.json(
      data,
      { status: 200 }
    );    
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
