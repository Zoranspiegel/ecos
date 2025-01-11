'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserProfile from '@/hooks/useUserProfile';
import Image from 'next/image';
import Loading from './Loading';

export default function HeaderUser() {
  const { data, isLoading, isValidating, error } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (error && !isValidating) {
      router.push('/');
    }
  }, [error, isValidating, router]);

  if (isLoading)
    return (
      <div className="h-[30%] pr-6 flex animate-pulse">
        <Loading />
      </div>
    );

  if (error) return null;

  return (
    <div className="h-full flex items-center justify-center gap-2">
      <span className={`text-xl ${data?.is_admin ? 'text-redhaus' : ''}`}>
        {data?.username}
      </span>
      <div className="relative h-full aspect-square border-4 border-double border-foreground rounded-full flex items-center justify-center overflow-hidden">
        {data?.avatar ? (
          <Image
            src={data?.avatar}
            alt={`${data?.username}'s profile picture`}
            fill
          />
        ) : (
          <h1 className="text-3xl uppercase">{data?.username[0]}</h1>
        )}
      </div>
    </div>
  );
}
