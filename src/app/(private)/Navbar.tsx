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

export default function Navbar() {
  const pathname = usePathname();  

  return (
    <nav className="border-4 border-double border-foreground rounded-full bg-background flex items-center justify-evenly">
      <Link href="/feed" className={`${pathname.startsWith('/feed') ? 'text-yellowhaus' : undefined} text-2xl`}>
        <FaHome />
      </Link>
      <Link href="/post" className={`${pathname.startsWith('/post') ? 'text-yellowhaus' : undefined} text-xl`}>
        <FaComment />
      </Link>
      <Link href="/followers" className={`${pathname.startsWith('/followers') ? 'text-yellowhaus' : undefined} text-2xl`}>
        <FaUserFriends />
      </Link>
      <Link href="/following" className={`${pathname.startsWith('/following') ? 'text-yellowhaus' : undefined} text-2xl`}>
        <FaUsers />
      </Link>
      <Link href="/admin" className={`${pathname.startsWith('/admin') ? 'text-yellowhaus' : undefined} text-xl`}>
        <FaCog />
      </Link>
    </nav>
  );
}
