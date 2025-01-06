'use client';

import Image from 'next/image';
import useSWR from 'swr';

export default function HeaderUser() {
  const { data, isLoading, error } = useSWR('/api/users/profile', (url) =>
    fetch(url).then((res) => res.json())
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>ERROR</h1>;
  return (
    <div className="h-full flex items-center justify-center gap-2">
      <span className={`${data.is_admin ? 'text-redhaus' : undefined}`}>
        {data.username}
      </span>
      <div className="relative h-[90%] aspect-square border-2 rounded-full flex items-center justify-center overflow-hidden">
        {data.avatar ? (
          <Image
            src={data.avatar}
            alt={`${data.username}'s profile picture`}
            fill
          />
        ) : (
          <h1 className="text-3xl uppercase">{data.username[0]}</h1>
        )}
      </div>
    </div>
  );
}
