'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  UserCircleIcon, 
  CogIcon, 
  DocumentTextIcon,
  LogoutIcon 
} from '@heroicons/react/outline';

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Redirect to login page
    router.push('/auth/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-full"
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center p-6 border-b">
            <Image 
              src="/water-logo.svg" 
              alt="WaterTech Logo" 
              width={50} 
              height={50} 
            />
            <span className="ml-3 text-xl font-bold text-blue-900">
              WaterTech Dashboard
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <Link 
              href="/dashboard" 
              className="flex items-center p-3 text-blue-700 hover:bg-blue-50 rounded-lg transition"
            >
              <HomeIcon className="h-6 w-6 mr-3" />
              Dashboard
            </Link>
            <Link 
              href="/dashboard/profile" 
              className="flex items-center p-3 text-blue-700 hover:bg-blue-50 rounded-lg transition"
            >
              <UserCircleIcon className="h-6 w-6 mr-3" />
              Profile
            </Link>
            <Link 
              href="/dashboard/courses" 
              className="flex items-center p-3 text-blue-700 hover:bg-blue-50 rounded-lg transition"
            >
              <DocumentTextIcon className="h-6 w-6 mr-3" />
              My Courses
            </Link>
            <Link 
              href="/dashboard/settings" 
              className="flex items-center p-3 text-blue-700 hover:bg-blue-50 rounded-lg transition"
            >
              <CogIcon className="h-6 w-6 mr-3" />
              Settings
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
            >
              <LogoutIcon className="h-6 w-6 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
