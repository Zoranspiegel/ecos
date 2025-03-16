'use client';

import LogOutBtn from "@/components/LogOutBtn";
import UploadAvatarBtn from "@/components/UploadAvatarBtn";
import useUser from "@/hooks/useUser";
import Image from "next/image";

export default function AccountPage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>LOADING...</div>;
  if (error || !user) return;

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-full flex flex-col items-center justify-center gap-8">
        <h1 className={`text-4xl font-bold ${user.is_admin ? 'text-redhaus' : ''}`}>{user.username}</h1>
        <div className="relative w-[80%] aspect-square flex items-center justify-center border-4 border-double rounded-full overflow-hidden">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt=""
              fill
            />
          ) : (
            <span className="text-[12rem]">{user.username[0]}</span>
          )}
        </div>
        <UploadAvatarBtn />
      </div>
      <LogOutBtn />
    </div>
  );
}