import { FollowsUser } from "@/models/Follows";
import Image from "next/image";
import FollowBtn from "./FollowBtn";

export default function UserFollows({ user }: { user: FollowsUser }) {
  return (
    <div className="w-full flex items-center justify-between pr-2">
      <div className="flex w-full items-center gap-4">
        <div className="relative flex w-[20%] aspect-square rounded-full border-4 border-double border-foreground items-center justify-center overflow-hidden">
          {user.avatar ? (
            <Image src={user.avatar} fill alt="" />
          ) : (
            <div className="text-3xl">{user.username[0]}</div>
          )}
        </div>
        <h1 className="text-xl font-bold">{user.username}</h1>
      </div>
      <FollowBtn userID={user.id} followed={user.followed_back} />
    </div>
  );
}
