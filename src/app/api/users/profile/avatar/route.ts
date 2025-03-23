import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import env from "@/env";
import { jwtVerify } from "jose";
import { getClient } from "@/db";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    // BODY CHECK
    const { file, name } = await request.json();

    if (!file || !name) {
      return NextResponse.json(
        { error: 'Invalid avatar file' },
        { status: 400 }
      );
    }    

    // JWT TOKEN COOKIE CHECK
    const cookie = request.cookies.get('jwt-token');

    if (!cookie?.value) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    // LOGGED IN USER ID CHECK
    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload.sub) {
      return NextResponse.json(
        { error: 'Unauthenticated' },
        { status: 403 }
      );
    }

    // CLOUDINARY NEW AVATAR SAVE
    interface AvatarImage {
      url?: string;
      width?: number;
      height?: number;
    }
    const avatarImage: AvatarImage = {};
    try {
      const result = await cloudinary.uploader.upload(file, {
        public_id: name,
        folder: 'Ecos/Profile Images'
      });
      
      avatarImage.url = result.secure_url;
      // avatarImage.width = result.width;
      // avatarImage.height = result.height;

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack);
      }

      return NextResponse.json(
        { error },
        { status: 400 }
      );
    }

    // AVATAR UPDATE
    const { id } = JSON.parse(payload.sub);

    const client = getClient();
    await client.connect();

    await client.query(
      `UPDATE PUBLIC.users
      SET avatar = $1
      WHERE id = $2`,
      [avatarImage.url, id]
    );

    await client.end();

    return NextResponse.json(
      { msg: 'Avatar update success' },
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