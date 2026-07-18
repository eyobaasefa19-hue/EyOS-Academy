import './globals.css';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EyOS Academy - AI English Tutor',
  description: 'Personalized AI-powered English learning for Amharic speakers.',
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
