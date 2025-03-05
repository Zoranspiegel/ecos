import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        redhaus: 'var(--bauhaus-red-color)',
        bluehaus: 'var(--bauhaus-blue-color)',
        yellowhaus: 'var(--bauhaus-yellow-color)'
      },
      keyframes: {
        loading1: {
          '0%': { opacity: '0.5' },
          '20%': { opacity: '0.3' },
          '100%': { opacity: '0.5' }
        },
        loading2: {
          '0%': { opacity: '0.5' },
          '40%': { opacity: '0.3' },
          '100%': { opacity: '0.5' }
        },
        loading3: {
          '0%': { opacity: '0.5' },
          '60%': { opacity: '0.3' },
          '100%': { opacity: '0.5' }
        },
        loading4: {
          '0%': { opacity: '0.5' },
          '80%': { opacity: '0.3' },
          '100%': { opacity: '0.5' }
        }
      },
      animation: {
        loading1: 'loading1 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        loading2: 'loading2 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        loading3: 'loading3 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        loading4: 'loading4 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      boxShadow: {
        'thickness': '0px 4px 0px 0px'
      }
    }
  },
  plugins: []
} satisfies Config;
