'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useUserProfile from '@/hooks/useUserProfile';
import HomeIcon from '@/components/HomeIcon';
import EcoIcon from '@/components/EcoIcon';
import SocialIcon from '@/components/SocialIcon';
import AdminIcon from '@/components/AdminIcon';
import ThemeBtn from '@/components/ThemeBtn';

export default function Navbar() {
  const pathname = usePathname();
  const { data } = useUserProfile();

  return (
    <nav className="border-4 border-double border-foreground rounded-l-full bg-background pl-1 pr-3 flex items-center justify-between">
      <ThemeBtn />
      <Link href="/feed" className="h-[60%] aspect-square">
        <HomeIcon active={pathname.startsWith('/feed')} />
      </Link>
      <Link href="/post" className="h-[60%] aspect-square">
        <EcoIcon active={pathname.startsWith('/post')} />
      </Link>
      <Link href="/social" className="h-[60%] aspect-square">
        <SocialIcon active={pathname.startsWith('/social')} />
      </Link>
      {data?.is_admin && (
        <Link href="/admin" className="h-[60%] aspect-square">
          <AdminIcon active={pathname.startsWith('/admin')} />
        </Link>
      )}
    </nav>
  );
}
