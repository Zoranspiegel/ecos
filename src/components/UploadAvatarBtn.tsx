"use client";

import { useState } from "react";
import Image from "next/image";
import useLoggedInUser from "@/hooks/useLoggedInUser";

interface Avatar {
  file: string | ArrayBuffer | null;
  name: string;
}

export default function UploadAvatarBtn() {
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const { mutate } = useLoggedInUser();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setAvatar({
        file: base64String,
        name: file.name,
      });
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const res = await fetch('/api/users/profile/avatar', {
      method: 'PUT',
      body: JSON.stringify(avatar)
    });

    if (res.ok) {
      mutate();
      setAvatar(null);
    }
  }

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      {typeof avatar?.file === "string" && (
        <div className="relative w-12 aspect-square">
          <Image src={avatar.file} fill alt="" />
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
      <button className="rounded-full bg-redhaus px-4 py-2">Submit</button>
    </form>
  );
}
