import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getClient } from '@/db';
import { UserSchema } from '@/models/User';
import env from '@/env';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // JWT TOKEN ON COOKIE CHECK
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

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload.sub) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }
    
    // LOGGED USER CHECK
    const { id } = JSON.parse(payload.sub);

    const client = getClient();

    await client.connect();

    const userRes = await client.query(
      'SELECT id, username, avatar, is_admin, created_at, updated_at FROM public.users WHERE id = $1',
      [id]
    );

    await client.end();

    if (!userRes.rowCount) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    // DB USER RESPONSE ZOD PARSING & RESPONSE
    try {
      UserSchema.parse(userRes.rows[0]);
    } catch (error) {
      throw error;
    }

    const data = UserSchema.parse(userRes.rows[0]);

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
