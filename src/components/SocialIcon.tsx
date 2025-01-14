export default function SocialIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox='0 0 14 14' fill='none'>      
      <g className={`fill-${active ? 'bluehaus' : 'foreground'}`}>
        {/* LEFT FIGURE */}
        <circle cx="3" cy="2" r="2"/>
        <circle cx="3" cy="7" r="3"/>
        <rect x="0" y="7" width="6" height="5"/>

        {/* RIGHT FIGURE */}
        <circle cx="11" cy="2" r="2"/>
        <circle cx="11" cy="7" r="3"/>
        <rect x="8" y="7" width="6" height="5"/>
      </g>
        {/* LEFT SOLHOUETTE */}
        <circle cx="6.5" cy="3.5" r="2" className="fill-background"/>
        <circle cx="6.5" cy="8.5" r="3" className="fill-background"/>
        <rect x="3.5" y="8.5" width="6" height="5" className="fill-background"/>

        {/* RIGHT SOLHOUETTE */}
        <circle cx="7.5" cy="3.5" r="2" className="fill-background"/>
        <circle cx="7.5" cy="8.5" r="3" className="fill-background"/>
        <rect x="4.5" y="8.5" width="6" height="5" className="fill-background"/>
      <g className={`fill-${active ? 'redhaus' : 'foreground'}`}>
        {/* FRONT FIGURE */}
        <circle cx="7" cy="4" r="2"/>
        <circle cx="7" cy="9" r="3"/>
        <rect x="4" y="9" width="6" height="5"/>
      </g>
    </svg>
  );
}