export default function Logo() {
  return (    
    <svg viewBox="0 0 52 14" fill="none">
      <rect x="0" y="0" width="14" height="4" className="fill-redhaus" />
      <rect x="0" y="5" width="14" height="4" className="fill-redhaus" />
      <rect x="0" y="10" width="14" height="4" className="fill-redhaus" />
      <path d="M22,7 L15,7 A7,7 0 0,1 22,0" className='fill-bluehaus' />
      <path d="M22,7 L15,7 A7,7 0 0,0 22,14" className='fill-bluehaus' />
      <circle cx="30" cy="7" r="7" className='fill-foreground' />
      <rect x="41.5" y="0" width="10.5" height="7" className='fill-yellowhaus' />
      <circle cx="41.5" cy="3.5" r="3.5" className='fill-yellowhaus' />
      <rect x="38" y="7" width="10.5" height="7" className='fill-yellowhaus' />
      <circle cx="48.5" cy="10.5" r="3.5" className='fill-yellowhaus' />
    </svg>
  );
}
