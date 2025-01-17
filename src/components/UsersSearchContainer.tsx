'use client';

import { useUsers } from '@/hooks/useUsers';
import UserSearch from './UserSearch';

export default function UsersSearchContainer({
  userSearch,
  setUserID
}: {
  userSearch: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { users, isLoading, error } = useUsers({ userSearch });

  if (isLoading) return null;

  if (error) return null;

  return (
    <div className="absolute top-full left-0 right-0 border-r-2 border-r-[#ffffff80] border-b-2 border-b-[#ffffff50] bg-bluehaus opacity-90">
      {users?.map((user) => (
        <UserSearch key={user.id} user={user} setUserID={setUserID} />
      ))}
    </div>
  );
}
