import HeaderUser from '@/components/HeaderUser';

export default function Header() {
  return (
    <header className='border-4 border-double px-6 flex items-center justify-between'>
      <h1 className='text-3xl'>Ecos</h1>
      <HeaderUser />
    </header>
  );
}