'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import Image from 'next/image';
import Loading from './Loading';
import Link from 'next/link';

export default function HeaderUser() {
  const { loggedInUser, isLoading, error } = useLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/');
    }
  }, [error, router]);

  if (isLoading)
    return (
      <div className="h-[30%] pr-6 flex animate-pulse">
        <Loading />
      </div>
    );

  if (error) return null;

  return (
    <div className="h-full flex items-center justify-center gap-2">
      <Link
        className={`text-xl ${loggedInUser?.is_admin ? 'text-redhaus' : ''}`}
        href='/account'
      >
        {loggedInUser?.username}
      </Link>
      <Link
        className="relative h-full aspect-square border-4 border-double border-foreground rounded-full flex items-center justify-center overflow-hidden"
        href='/account'
      >
        {loggedInUser?.avatar ? (
          <Image
            src={loggedInUser?.avatar}
            alt={`${loggedInUser?.username}'s profile picture`}
            fill
          />
        ) : (
          <h1 className="text-3xl uppercase">{loggedInUser?.username[0]}</h1>
        )}
      </Link>
    </div>
  );
}
