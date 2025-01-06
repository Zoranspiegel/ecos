import {
  FaHome,
  FaComment,
  FaUsers,
  FaUserFriends,
  FaCog
} from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-4 border-double flex items-center justify-evenly">
      <Link href="/feed" className='text-2xl'>
        <FaHome />
      </Link>
      <Link href="/post" className='text-xl'>
        <FaComment />
      </Link>
      <Link href="/followers" className='text-2xl'>
        <FaUserFriends />
      </Link>
      <Link href="/following" className='text-2xl'>
        <FaUsers />
      </Link>
      <Link href="/admin" className='text-xl'>
        <FaCog />
      </Link>
    </nav>
  );
}
