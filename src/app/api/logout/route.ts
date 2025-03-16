import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const response = NextResponse.json(
      { error: 'Log Out Success' },
      { status: 200 }
    );
    response.cookies.delete('jwt-token');
    
    return response;
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