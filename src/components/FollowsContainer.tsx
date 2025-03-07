import useFollows from "@/hooks/useFollows";
import { FollowsUser } from "@/models/Follows";
import UserFollows from "./UserFollows";
import { useEffect } from "react";

export default function FollowsContainer({
  type,
  userID,
  page,
  setLoadMore
}: {
  type: followsT;
  page: number;
  setLoadMore: React.Dispatch<React.SetStateAction<boolean>>;
  userID?: string;
}) {
  const { followsUsers, error, isLoading } = useFollows({ type, userID, page });

  useEffect(() => {
    if (followsUsers?.length === 0) {
      setLoadMore(false);
    }
  }, [followsUsers, setLoadMore]);

  if (isLoading) return;
  if (error) return <div>ERROR</div>;

  return (
    <div className="flex flex-col gap-2 mb-2">
      {followsUsers?.map((user: FollowsUser) => (
        <UserFollows key={user.id} user={user} />
      ))}
    </div>
  );
}
