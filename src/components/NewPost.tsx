"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";
import { mutate } from "swr";

export default function NewPost() {
  const [newPost, setNewPost] = useState<string>("");
  const [postImage, setPostImage] = useState<ImageState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setPostImage(null);
    }
  }, []);

  // HANDLE CHANGE NEW POST
  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewPost(e.target.value);
  }

  // HANDLE CHANGE UPLOAD IMAGE
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;

    const image = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        setPostImage({
          file: base64String,
          name: image.name,
          width: img.width,
          height: img.height,
        });
      };
    };

    reader.readAsDataURL(image);
  }

  // HANDLE CLEAR IMAGE
  function handleClearImage() {
    setPostImage(null);
  }

  // SUBMIT NEW POST
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const body = JSON.stringify({
      content: newPost,
      image: postImage
    });
    setNewPost("")
    setPostImage(null);

    const fetchURL = "/api/posts";
    const res = await fetch(fetchURL, {
      method: "POST",
      body,
    });
    setLoading(false);

    if (res.ok) {
      mutate((key: string) => key.startsWith(fetchURL));
    }
  }

  return (
    <form className="h-full flex-1 flex flex-col items-center" onSubmit={handleSubmit}>
      <textarea
        className="w-full h-full border-4 border-double border-foreground bg-background p-4 text-lg resize-none outline-none"
        onChange={handleTextChange}
        value={newPost}
        placeholder="Share your voice..."
      />
      {typeof postImage?.file === "string" && (
        <div className="flex justify-center w-full h-full max-h-[70%] flex-shrink-0 border-x-4 border-b-4 border-double border-foreground">
          <NextImage
            src={postImage.file}
            alt="New image preview"
            width={postImage.width}
            height={postImage.height}
          />
        </div>
      )}
      <div className="flex justify-between h-16 w-full border-4 border-t-0 border-double border-foreground">
        <button
          className="text-2xl border-r-4 px-2 border-double border-foreground enabled:hover:font-bold"
          disabled={!newPost && !postImage}
          type="submit"
        >
          {loading ? 'LOADING...' : 'POST'}
        </button>
        <div className="flex">
          {postImage ? (
            <button
              className="flex items-center justify-center px-2 border-l-4 border-double border-foreground text-2xl cursor-pointer hover:font-bold"
              type="button"
              onClick={handleClearImage}
            >
              CANCEL
            </button>
          ) : (
            <label
              className="flex items-center justify-center px-2 border-l-4 border-double border-foreground text-2xl cursor-pointer hover:font-bold"
              htmlFor="upImage"
            >
              IMAGE
            </label>
          )}
          <input type="file" id="upImage" onChange={handleImageChange} hidden />
        </div>
      </div>
    </form>
  );
}
