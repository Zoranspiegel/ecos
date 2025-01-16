import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

const bauhausFont = localFont({
  src: './fonts/bauhaus/BauhausRegular.ttf',
  variable: '--font-bauhaus'
});

export const metadata: Metadata = {
  title: 'Ecos',
  description:
    'Social media platform for sharing media content, connecting with friends, discovering, and exploring interests through a visually engaging interface'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className={`${bauhausFont.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
