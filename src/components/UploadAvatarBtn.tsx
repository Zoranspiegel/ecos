"use client";

import { useState } from "react";
import Image from "next/image";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import imageCompression from "browser-image-compression";

export default function UploadAvatarBtn() {
  const [avatar, setAvatar] = useState<ImageState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useLoggedInUser();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setAvatar({
        file: base64String,
        name: file.name,
      });
    };

    reader.readAsDataURL(compressedFile);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    const body = JSON.stringify(avatar);

    const res = await fetch("/api/users/profile/avatar", {
      method: "PUT",
      body,
    });

    setLoading(false);

    if (res.ok) {
      setAvatar(null);
      mutate();
    }
  }

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      {typeof avatar?.file === "string" && (
        <div className="relative w-12 aspect-square">
          <Image src={avatar.file} fill alt="Selected image" />
        </div>
      )}
      <label
        htmlFor="upFile"
        className="rounded-full bg-bluehaus px-4 py-2 cursor-pointer"
      >
        Upload Avatar
      </label>
      <input
        id="upFile"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
      <button
        hidden={!avatar}
        disabled={!avatar}
        className="rounded-full bg-redhaus px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}
