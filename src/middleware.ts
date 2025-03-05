import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import env from '@/env';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authenticatedAPIRoutes = [
    pathname.startsWith('/api/users'),
    pathname.startsWith('/api/posts'),
    pathname.startsWith('/api/follows'),
  ]

  if (authenticatedAPIRoutes.includes(true)) {
    try {
      const cookieStore = await cookies();
      const cookie = cookieStore.get('jwt-token');
      if (!cookie?.value) {
        return NextResponse.json(
          { error: 'Unauthenticated' },
          { status: 403 }
        );        
      }
      
      const token = cookie.value;
      const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

      await jwtVerify(token, jwtSecret);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack);
      }
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );      
    }
  }
}

export const config = {
  matcher: '/api/:path*'
};
