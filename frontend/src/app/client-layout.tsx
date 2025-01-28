'use client';

import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthProvider>
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </AuthProvider>
    </div>
  );
}
