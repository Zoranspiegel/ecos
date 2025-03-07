import { getClient } from "@/db";
import env from "@/env";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // USER ID BODY CHECK
    const { userID } = await request.json();

    if (!userID) {
      return NextResponse.json(
        { error: 'Missing data' },
        { status: 400 }
      );
    }

    // JWT ON COOKIE CHECK
    const cookie = request.cookies.get('jwt-token');
    
    if (!cookie?.value) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    // JWT VERIFY
    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload?.sub) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    const loggedUserID = JSON.parse(payload.sub).id;

    // CLIENT QUERY
    const client = getClient();
    await client.connect();

    await client.query(
      `INSERT INTO PUBLIC.follows (user_id, follower_id)
      VALUES ($1, $2)`,
    [userID, loggedUserID]);

    await client.end();
    
    // SUCCESS RESPONSE
    return NextResponse.json(
      { error: 'Success' },
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

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    // USER ID BODY CHECK
    const { userID } = await request.json();

    if (!userID) {
      return NextResponse.json(
        { error: 'Missing data' },
        { status: 400 }
      );
    }

    // JWT ON COOKIE CHECK
    const cookie = request.cookies.get('jwt-token');
    
    if (!cookie?.value) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    // JWT VERIFY
    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload?.sub) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    const loggedUserID = JSON.parse(payload.sub).id;

    // CLIENT QUERY
    const client = getClient();
    await client.connect();

    await client.query(
      `DELETE FROM PUBLIC.follows
      WHERE user_id = $1 AND follower_id = $2
      `,
    [userID, loggedUserID]);

    await client.end();

    // SUCCESS RESPONSE
    return NextResponse.json(
      { error: 'Success' },
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
