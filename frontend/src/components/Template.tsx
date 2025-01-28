'use client';

import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="flex-grow flex flex-col pt-16">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
}
