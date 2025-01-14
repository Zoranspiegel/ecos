export default function AdminIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 14 14" fill="none">
      <rect x="0" y="0" width="14" height="14" className={`fill-${active ? 'bluehaus' : 'foreground'}`}/>
      <rect x="1" y="1" width="12" height="12" className='fill-background'/>
      <g transform="translate(7, 7)">
        {/* <!-- Dientes del engranaje --> */}
        <g className={`fill-${active ? 'redhaus' : 'foreground'}`}>
          <path
            d="M0.2 -6.2 L3 -5.5 L2.5 -3.5 L-0.4 -4.5 Z"
            transform="rotate(0)"
          />

          <path
            d="M0.2 -6.2 L3 -5.5 L2.5 -3.5 L-0.4 -4.5 Z"
            transform="rotate(60)"
          />

          <path
            d="M0.2 -6.2 L3 -5.5 L2.5 -3.5 L-0.4 -4.5 Z"
            transform="rotate(120)"
          />

          <path
            d="M0.2 -6.2 L3 -5.5 L2.5 -3.5 L-0.4 -4.5 Z"
            transform="rotate(180)"
          />

          <path
            d="M0.2 -6.2 L3 -5.5 L2.5 -3.5 L-0.4 -4.5 Z"
            transform="rotate(240)"
          />

          <path
            d="M0.2 -6.2 L3 -5.5 L2.5 -3.5 L-0.4 -4.5 Z"
            transform="rotate(300)"
          />
        </g>
        {/* <!-- Círculo central --> */}
        <circle cx="0" cy="0" r="4.5" className={`fill-${active ? 'redhaus' : 'foreground'}`} />
        <circle cx="0" cy="0" r="2" className='fill-background' />
      </g>
    </svg>
  );
}
