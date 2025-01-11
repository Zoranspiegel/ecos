import HeaderUser from '@/components/HeaderUser';

export default function Header() {
  return (
    <header className='border-4 border-double border-foreground bg-background rounded-r-full pl-6 flex items-center justify-between'>
      <h1 className='text-5xl'>Ecos</h1>
      <HeaderUser />
    </header>
  );
}