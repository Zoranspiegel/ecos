import HeaderUser from '@/components/HeaderUser';
import Logo from '@/components/Logo';

export default function Header() {
  return (
    <header className="border-4 border-double border-foreground bg-background rounded-r-full flex items-center justify-between">
      <div className="h-full p-2 flex">
        <Logo />
      </div>
      <HeaderUser />
    </header>
  );
}
