'use client';

import {
  FaHome,
  FaComment,
  FaUsers,
  FaUserFriends,
  FaCog
} from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useUserProfile from '@/hooks/useUserProfile';

export default function Navbar() {
  const pathname = usePathname();
  const { data } = useUserProfile();

  return (
    <nav className="border-4 border-double border-foreground rounded-l-full bg-background flex items-center justify-evenly">
      <Link href="/feed" className={`${pathname.startsWith('/feed') ? 'text-redhaus' : 'text-foreground'} text-2xl`}>
        <FaHome />
      </Link>
      <Link href="/post" className={`${pathname.startsWith('/post') ? 'text-redhaus' : 'text-foreground'} text-xl`}>
        <FaComment />
      </Link>
      <Link href="/followers" className={`${pathname.startsWith('/followers') ? 'text-redhaus' : 'text-foreground'} text-2xl`}>
        <FaUserFriends />
      </Link>
      <Link href="/following" className={`${pathname.startsWith('/following') ? 'text-redhaus' : 'text-foreground'} text-2xl`}>
        <FaUsers />
      </Link>
      {data?.is_admin && (
        <Link href="/admin" className={`${pathname.startsWith('/admin') ? 'text-redhaus' : 'text-yellowhaus'} text-xl`}>
          <FaCog />
        </Link>
      )}
    </nav>
  );
}
