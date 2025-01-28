import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OneWater.AI - Advanced Water Management Platform',
  description: 'Next-generation water management platform powered by artificial intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <div className="flex-1">
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
