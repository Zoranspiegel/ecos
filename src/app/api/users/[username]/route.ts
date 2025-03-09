import { getClient } from "@/db";
import env from "@/env";
import { UserSchema } from "@/models/User";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
): Promise<NextResponse> {
  try {
    // CHECK LOGGED IN USER ID
    const cookie = request.cookies.get('jwt-token');

    if (!cookie?.value) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 500 }
      );
    }

    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload.sub) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 500 }
      );
    }

    const { id } = JSON.parse(payload.sub);

    // CHECK USERNAME ON PARAMS
    const { username } = await params;

    // CLIENT CONNECTION & QUERY
    const client = getClient();
    await client.connect();

    const resUser = await client.query(
      `SELECT U.id, U.username, U.avatar, U.is_admin, U.created_at, U.updated_at,
      EXISTS(
        SELECT 1
        FROM PUBLIC.follows F
        WHERE F.follower_id = $2
        AND F.user_id = U.id
      ) AS followed_back
      FROM PUBLIC.users U
      WHERE U.username ILIKE $1`,
      [username, id]);

    await client.end();

    // NOT FOUND RESPONSE
    if (!resUser.rowCount) {
      return NextResponse.json(
        { error: 'User Not Found' },
        { status: 404 }
      );
    }

    // ZOD USER PARSE
    const user = UserSchema.safeParse(resUser.rows[0]).data;

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
