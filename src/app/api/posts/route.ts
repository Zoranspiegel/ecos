import { getClient } from "@/db";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import env from "@/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  // GET CONTENT FROM BODY
  const { content, image } = await request.json();

  if (!content && !image) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

  try {
    // JWT ON COOKIE CHECK
    const cookieStore = request.cookies;
    const cookie = cookieStore.get("jwt-token");

    if (!cookie?.value) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    // JWT TOKEN JOSE VERIFICATION
    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload.sub) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    interface NewImage {
      url?: string;
      width?: number;
      height?: number;
    }
    const newImage: NewImage = {};

    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image.file, {
          public_id: image.name,
          folder: "Ecos/Images",
        });

        newImage.url = result.secure_url;
        newImage.width = result.width;
        newImage.height = result.height;
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
      }
    }

    // CREATE NEW POST
    const { id } = JSON.parse(payload.sub);
    const client = getClient();
    await client.connect();

    const newPostRes = await client.query(
      `INSERT INTO PUBLIC.posts (content, user_id) VALUES ($1, $2)
      RETURNING *`,
      [content.normalize("NFC"), id]
    );

    if (!newPostRes.rowCount) {
      await client.end();
      throw new Error("New Post Creation Failed");
    }

    // DATABASE IMAGE STORING
    if (newImage.url) {
      await client.query(
        `INSERT INTO PUBLIC.images (post_id, url, width, height)
        VALUES ($1, $2, $3, $4)`,
        [newPostRes.rows[0].id, newImage.url, newImage.width, newImage.height]
      );
    }

    await client.end();

    return NextResponse.json({ msg: "Success" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    if (image) {
      await cloudinary.uploader.destroy(`Ecos/Images/${image.name}`);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
