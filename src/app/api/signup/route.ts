import { AuthUserSchema } from '@/models/User';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getClient } from '@/db';
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

    // USERNAME CHECK
    const client = getClient();

    await client.connect();

    const oldUserRes = await client.query(
      'SELECT id FROM users WHERE username LIKE $1',
      [username]
    );

    if (oldUserRes.rowCount) {
      await client.end();
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      );
    }

    // BCRYPT PASSWORD ENCRYPTION
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    // NEW USER CREATION
    const newUserRes = await client.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hash]
    );

    await client.end();

    if (!newUserRes.rowCount) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }

    // JOSE JWT TOKEN SIGNATURE
    const jwtSubject = JSON.stringify(newUserRes.rows[0]);
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(jwtSubject)
      .setExpirationTime('20h')
      .setIssuedAt()
      .sign(jwtSecret)

    // SUCCESS RESPONSE & COOKIE CREATION WITH JWT TOKEN 
    const response = NextResponse.json(
      { msg: 'Signup Success' },
      { status: 201 }
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
