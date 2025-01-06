export default function Header() {
  return (
    <header className='border-4 border-double px-6 flex items-center justify-between'>
      <h1 className='text-3xl'>Ecos</h1>
      <div className='h-full flex items-center justify-center gap-2'>
        <span>USERNAME</span>
        <div className='h-[90%] aspect-square border-2 rounded-full flex items-center justify-center'>X</div>
      </div>
    </header>
  );
}