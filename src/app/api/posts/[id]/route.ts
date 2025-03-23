import { getClient } from "@/db";
import env from "@/env";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // POST ID PARAMS
    const { id } = await params;

    // CONTENT FROM BODY
    const { content } = await request.json();

    // LOGGED USER ID CHECK
    const cookiestore = request.cookies;
    const cookie = cookiestore.get("jwt-token");

    if (!cookie?.value) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload?.sub) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    const userID = JSON.parse(payload.sub).id;

    // EDIT POST CONTENT
    const client = getClient();
    await client.connect();

    const editedPostRes = await client.query(
      `UPDATE PUBLIC.posts
      SET content = $1, updated_at = NOW()
      WHERE user_id = $2 AND id = $3
      RETURNING id`,
      [content, userID, id]
    );

    await client.end();

    if (!editedPostRes.rowCount) {
      return NextResponse.json({ error: "Post Not Found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Patch Success" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // POST ID PARAMS
    const { id } = await params;

    // LOGGED USER ID CHECK
    const cookiestore = request.cookies;
    const cookie = cookiestore.get("jwt-token");

    if (!cookie?.value) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    const token = cookie.value;
    const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload?.sub) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    const userID = JSON.parse(payload.sub).id;

    // CLIENT CONNECTION
    const client = getClient();
    await client.connect();

    // IMAGE CLOUDINARY PUBLIC ID FIND
    const imageRes = await client.query(
      `SELECT url FROM PUBLIC.images
      WHERE post_id = $1`,
      [id]
    );

    const imageUrl = imageRes.rows[0].url;

    const publicID = decodeURIComponent(
      imageUrl.match(/\/upload\/v\d+\/(.+?)(\.[a-z]+)?$/i)[1]
    );

    // POST DELETE
    const deletedPost = await client.query(
      `DELETE FROM PUBLIC.posts
      WHERE id = $1 AND user_id = $2
      RETURNING *`,
      [id, userID]
    );

    await client.end();

    if (!deletedPost.rowCount) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // CLOUDINARY IMAGE DESTROY
    try {
      await cloudinary.uploader.destroy(publicID);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack);
      }
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ msg: "Post delete success" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
