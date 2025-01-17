import { User } from '@/models/User';
import Image from 'next/image';

export default function UserSearch({
  user,
  setUserID
}: {
  user: User;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleClick() {    
    setUserID(user.id);
  }

  return (
    <div
      className="w-full h-12 p-1 flex items-center gap-2 overflow-hidden select-none cursor-pointer hover:bg-redhaus"
      onClick={handleClick}
    >
      <div className="relative h-full aspect-square border-2 border-foreground rounded-full bg-redhaus flex items-center justify-center overflow-hidden">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`${user.username}'s profile picture`}
            fill
          />
        ) : (
          <span className="text-2xl">{user.username[0]}</span>
        )}
      </div>
      <span className="text-lg">{user.username}</span>
    </div>
  );
}
