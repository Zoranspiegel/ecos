import { getClient } from '@/db';
import { AuthUserSchema } from '@/models/User';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';
import env from '@/env';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // ZOD BODY VALIDATIONS
    const body = await request.json();

    try {
      AuthUserSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((error) => error.message);
        return NextResponse.json({ errors }, { status: 400 });
      }
    }

    const { username, password } = AuthUserSchema.parse(body);

    // USER CHECK
    const client = getClient();
    await client.connect();

    const userRes = await client.query(
      'SELECT id, password FROM users WHERE username LIKE $1',
      [username]
    );

    await client.end();

    if (!userRes.rowCount) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 404 }
      );
    }

    const user = userRes.rows[0];

    // PASSWORD CHECK
    const hash = user.password;

    const match = await bcrypt.compare(password, hash);

    if (!match) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 403 }
      );
    }

    // JOSE JWT TOKEN SIGNATURE
    const jwtSubject = JSON.stringify({ id: user.id });
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(jwtSubject)
      .setExpirationTime('20h')
      .setIssuedAt()
      .sign(jwtSecret)

    // SUCCESS RESPONSE & COOKIE CREATION WITH JWT TOKEN
    const response = NextResponse.json(
      { error: 'Login Success' },
      { status: 200 }
    );

    response.cookies.set('jwt-token', token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true
    });

    return response;
  } catch (error) {
    // INTERNAL SERVER ERROR
    if (error instanceof Error) console.error(error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
