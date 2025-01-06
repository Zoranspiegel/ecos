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
    <nav className="border-4 border-double flex items-center justify-evenly">
      <Link href="/feed" className={`${pathname.startsWith('/feed') ? 'text-redhaus' : undefined} text-2xl`}>
        <FaHome />
      </Link>
      <Link href="/post" className={`${pathname.startsWith('/post') ? 'text-redhaus' : undefined} text-xl`}>
        <FaComment />
      </Link>
      <Link href="/followers" className={`${pathname.startsWith('/followers') ? 'text-redhaus' : undefined} text-2xl`}>
        <FaUserFriends />
      </Link>
      <Link href="/following" className={`${pathname.startsWith('/following') ? 'text-redhaus' : undefined} text-2xl`}>
        <FaUsers />
      </Link>
      <Link href="/admin" className={`${pathname.startsWith('/admin') ? 'text-redhaus' : undefined} text-xl`}>
        <FaCog />
      </Link>
    </nav>
  );
}
