export default function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox='0 0 14 14' fill='none'>
      <polygon points="0,7 7,0 14,7" className={`fill-${active ? 'redhaus' : 'foreground'}`}/>
      <rect x="2" y="8" width="10" height="6" className={`fill-${active ? 'bluehaus' : 'foreground'}`}/>
      <rect x="5.5" y="10" width="3" height="4" className='fill-background'/>
    </svg>
  );
}