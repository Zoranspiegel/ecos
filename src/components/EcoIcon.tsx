export default function EcoIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox='0 0 14 14' fill='none'>
      <g className={`fill-${active ? 'redhaus' : 'foreground'}`}>
        <path d="M0,0 L0,14 A14,14 0 0,0 14,0"/>
        <path d="M0,0 L0,13 A13,13 0 0,0 13,0" className="fill-background"/>
        <path d="M0,0 L0,12 A12,12 0 0,0 12,0"/>
        <path d="M0,0 L0,11 A11,11 0 0,0 11,0" className="fill-background"/>
        <path d="M0,0 L0,10 A10,10 0 0,0 10,0"/>
        <path d="M0,0 L0,9 A9,9 0 0,0 9,0" className="fill-background"/>
        <path d="M0,0 L0,8 A8,8 0 0,0 8,0"/>
        <path d="M0,0 L0,7 A7,7 0 0,0 7,0" className="fill-background"/>
      </g>
      <circle cx="2" cy="2" r="2" className={`fill-${active ? 'bluehaus' : 'foreground'}`}/>
    </svg>
  );
}
