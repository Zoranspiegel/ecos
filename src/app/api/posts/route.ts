import { getClient } from "@/db";
import env from "@/env";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import sharp from "sharp";

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
      // TRANSFORM IMAGE FILE DATA URL TO BUFFER
      const imageBuffer = Buffer.from(image.file.split(",")[1], "base64");

      // COMPRESS & RESIZE IMAGE IF NEEDED USING SHARP LIBRARY
      const resizedImageBuffer = await sharp(imageBuffer)
        .resize({
          width: 2000,
          height: 2000,
          fit: "inside",
          withoutEnlargement: true,
        })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();

      // UPLOAD SHARP RETURNED BUFFER TO CLOUDINARY
      try {
        const cloudinaryResult: UploadApiResponse = await new Promise(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                public_id: image.name,
                folder: "Ecos/Images",
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result as UploadApiResponse);
              }
            );

            uploadStream.end(resizedImageBuffer); // BUFFER SENT
          }
        );

        newImage.url = cloudinaryResult.secure_url;
        newImage.width = cloudinaryResult.width;
        newImage.height = cloudinaryResult.height;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.stack);
        } else {
          console.error(error);
        }
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
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
