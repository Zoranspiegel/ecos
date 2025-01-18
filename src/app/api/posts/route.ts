import { getClient } from '@/db';
import env from '@/env';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // GET CONTENT FROM BODY
    const { content } = await request.json();

    // JWT ON COOKIE CHECK
    const cookieStore = request.cookies;
    const cookie = cookieStore.get('jwt-token');

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

    // CREATE NEW POST
    const { id } = JSON.parse(payload.sub);
    const client = getClient();
    await client.connect();

    const newPostRes = await client.query(
      `INSERT INTO PUBLIC.posts (content, user_id) VALUES ($1, $2)
      RETURNING *`,
      [content.normalize('NFC'), id]
    );

    await client.end();

    if (!newPostRes.rowCount) {
      throw new Error('New Post Creation Failed');
    }
    
    return NextResponse.json(
      { msg: 'Success', data: newPostRes.rows[0] },
      { status: 201 }
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