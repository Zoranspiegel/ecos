import useFollows from "@/hooks/useFollows";
import { FollowsUser } from "@/models/Follows";

export default function FollowsContainer({
  type,
  userID,
  page,
}: {
  type: followsT;
  page: number;
  userID?: string;
}) {
  const { followsUsers, error, isLoading } = useFollows({ type, userID, page });

  if (isLoading) return;
  if (error) return <div>ERROR</div>;

  return (
    <div>
      {followsUsers?.map((user: FollowsUser) => (
        <div key={user.id} className="w-full flex justify-between">
          <h1>{user.username}</h1>
          {user.followed_back === false ? <p>NOT</p> : <p>YES</p>}
        </div>
      ))}
    </div>
  );
}
