import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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
    <html lang="en" className="dark">
      <body className={`${bauhausFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
