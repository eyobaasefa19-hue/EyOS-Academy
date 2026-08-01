import './globals.css';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });

// PWA እና የገጽ መረጃዎች (Metadata)
export const metadata: Metadata = {
  title: 'EyOS Academy - AI English Tutor',
  description: 'Personalized AI-powered English learning for Amharic speakers.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'EyOS Academy',
  },
};

// የስክሪን መጠን እና የቴማቲካዊ ከለር መቆጣጠሪያ (Viewport)
export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Navbar />
        <div className="pt-20 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
