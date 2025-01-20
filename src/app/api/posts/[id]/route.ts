import { getClient } from '@/db';
import env from '@/env';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  try {
    // POST ID PARAMS
    const { id } = await params;

    // LOGGED USER ID CHECK
    const cookiestore = request.cookies;
    const cookie = cookiestore.get('jwt-token');

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

    const userID = JSON.parse(payload.sub).id;

    // POST DELETE
    const client = getClient();
    await client.connect();

    const deletedPost = await client.query(
      `DELETE FROM PUBLIC.posts
      WHERE id = $1 AND user_id = $2
      RETURNING *`,
      [id, userID]
    );    

    await client.end();

    if (!deletedPost.rowCount) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { msg: 'Post delete success' },
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
