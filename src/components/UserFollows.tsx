import { FollowsUser } from "@/models/Follows";
import Image from "next/image";
import FollowBtn from "./FollowBtn";
import Link from "next/link";

export default function UserFollows({ user }: { user: FollowsUser }) {
  return (
    <div className="w-full flex items-center justify-between pr-2">
      <div className="flex w-full items-center gap-4">
        <Link
          className="relative flex w-[20%] aspect-square rounded-full border-4 border-double border-foreground items-center justify-center overflow-hidden"
          href={`/${user.username}`}
        >
          {user.avatar ? (
            <Image src={user.avatar} fill alt="" />
          ) : (
            <div className="text-3xl">{user.username[0]}</div>
          )}
        </Link>
        <Link
          className="text-xl font-bold"
          href={`/${user.username}`}
        >
          {user.username}
        </Link>
      </div>
      <FollowBtn userID={user.id} followed={user.followed_back} />
    </div>
  );
}
