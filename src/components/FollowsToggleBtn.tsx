export default function FollowsToggleBtn({
  type,
  setType,
}: {
  type: followsT;
  setType: React.Dispatch<React.SetStateAction<followsT>>
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        className={`h-full rounded-l-full ${type === 'following' ? 'bg-redhaus translate-y-1' : 'bg-foreground shadow-thickness shadow-gray-400'} pl-14 pr-6 text-xl text-background transition-all`}
        onClick={() => setType('following')}
      >
        Following
      </button>
      <button
        className={`h-full rounded-r-full ${type === 'followers' ? 'bg-redhaus translate-y-1' : 'bg-foreground shadow-thickness shadow-gray-400'} pl-6 pr-14 text-xl text-background transition-all`}
        onClick={() => setType('followers')}
      >
        Followers
      </button>
    </div>
  );
}
