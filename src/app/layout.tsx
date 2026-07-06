import './globals.css';
import Navbar from '../components/Navbar';

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
      <body className="antialiased">
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
