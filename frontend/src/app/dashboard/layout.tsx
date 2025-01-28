'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  Cog6ToothIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/auth/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Videos', href: '/dashboard/videos', icon: VideoCameraIcon },
    { name: 'Courses', href: '/dashboard/courses', icon: DocumentTextIcon },
    { name: 'Community', href: '/community', icon: ChatBubbleLeftRightIcon },
    { name: 'Users', href: '/dashboard/users', icon: UsersIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen">
          <div className="flex min-h-screen bg-gray-100">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-full"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>

            <div className={`
              fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300
              ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
              md:relative md:translate-x-0
            `}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center p-6 border-b">
                  <Link href="/">
                    <div className="flex items-center">
                      <Image 
                        src="/water-logo.svg" 
                        alt="WaterTech Logo" 
                        width={50} 
                        height={50} 
                      />
                      <span className="ml-3 text-xl font-bold text-blue-900">
                        WaterTech
                      </span>
                    </div>
                  </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href} 
                      className={`flex items-center p-3 rounded-lg transition
                        ${isActive(item.href)
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                      <item.icon className="h-6 w-6 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="p-4 border-t">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                  >
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <main className="flex-1 md:ml-64 p-6 md:p-10 overflow-y-auto">
              {children}
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}
