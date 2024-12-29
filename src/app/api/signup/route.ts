import { AuthUserSchema } from '@/models/User';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    try {
      AuthUserSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((error) => error.message);
        return NextResponse.json({ errors }, { status: 400 });
      }
    }

    const response = NextResponse.json(
      { error: 'Under Development' },
      { status: 400 }
    );

    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
