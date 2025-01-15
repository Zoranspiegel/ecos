'use state';

import { useThemeContext } from '@/contexts/ThemeContext';

export default function ThemeBtn() {
  const { theme, toggleTheme } = useThemeContext();

  if (!theme) return null;

  return (
    <button
      className="relative h-[90%] aspect-square rounded-full overflow-hidden"
      onClick={toggleTheme}
    >
      <svg
        viewBox="0 0 14 14"
        fill="none"
        className={`${theme === 'light' ? '' : 'rotate-180'} transition-all`}
      >
        {/* DARK */}
        <path d="M7,7 L0,7 A7,7 0 0,0 7,14" className="fill-[#211814]" />
        <path d="M7,7 L14,7 A7,7 0 0,1 7,14" className="fill-[#211814]" />
        <line x1="7" y1="7.2" x2="7" y2="14" className="stroke-[#211814] stroke-[0.4]"/>
        <circle cx="4" cy="11" r="2" className="fill-[#f9f9f9]" />
        <circle cx="1" cy="9" r="0.2" className="fill-[#f9f9f9]" />
        <circle cx="4" cy="8" r="0.2" className="fill-[#f9f9f9]" />
        <circle cx="10" cy="12" r="0.2" className="fill-[#f9f9f9]" />
        <circle cx="13" cy="9" r="0.2" className="fill-[#f9f9f9]" />
        <circle cx="8" cy="9.5" r="0.3" className="fill-[#f9f9f9]" />
        <circle cx="7" cy="13" r="0.2" className="fill-[#f9f9f9]" />

        {/* LIGHT */}
        <path d="M7,7 L0,7 A7,7 0 0,1 7,0" className="fill-yellowhaus"/>
        <path d="M7,7 L14,7 A7,7 0 0,0 7,0" className="fill-yellowhaus"/>
        <path d="M7,7 L1,7 A6,6 0 0,1 7,1" className="fill-background"/>
        <path d="M7,7 L13,7 A6,6 0 0,0 7,1" className="fill-background"/>
        <path d="M7,7 L2,7 A5,5 0 0,1 7,2" className="fill-yellowhaus"/>
        <path d="M7,7 L12,7 A5,5 0 0,0 7,2" className="fill-yellowhaus"/>
        <circle cx="0" cy="5.2" r="1.1" className="fill-background"/>
        <circle cx="1" cy="3" r="1.1" className="fill-background"/>
        <circle cx="2.6" cy="1.3" r="1.1" className="fill-background"/>
        <circle cx="4.8" cy="0.2" r="1.1" className="fill-background"/>
        <circle cx="7.2" cy="0" r="1" className="fill-background"/>
        <circle cx="14" cy="5.2" r="1.1" className="fill-background"/>
        <circle cx="13" cy="3" r="1.1" className="fill-background"/>
        <circle cx="11.4" cy="1.3" r="1.1" className="fill-background"/>
        <circle cx="9.4" cy="0.2" r="1.1" className="fill-background"/>
        <line x1="7" y1="6.8" x2="7" y2="2" className="stroke-yellowhaus stroke-[0.4]"/>
      </svg>
      {/* SEA */}
      <svg viewBox="0 0 14 14" fill="none" className="absolute left-0 top-0">
        <line x1="7" y1="7.2" x2="7" y2="14" className="stroke-bluehaus stroke-[0.4]"/>
        <path d="M7,7 L0,7 A7,7 0 0,0 7,14" className="fill-bluehaus"/>
        <path d="M7,7 L14,7 A7,7 0 0,1 7,14" className="fill-bluehaus"/>
        <line x1="0" y1="7" x2="14" y2="7" className="stroke-background stroke-1"/>
      </svg>
    </button>
  );
}
