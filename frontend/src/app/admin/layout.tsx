'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  NewspaperIcon,
  UserGroupIcon,
  UsersIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Videos', href: '/admin/videos', icon: VideoCameraIcon },
  { name: 'Blog Posts', href: '/admin/blogs', icon: NewspaperIcon },
  { name: 'Community', href: '/admin/community', icon: UserGroupIcon },
  { name: 'Vendors', href: '/admin/vendors', icon: BuildingStorefrontIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-8">You do not have permission to access this area.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900/50 backdrop-blur-md overflow-y-auto">
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800/50 backdrop-blur-md">
          <Link href="/admin" className="text-xl font-bold text-white">
            Admin Panel
          </Link>
        </div>
        <nav className="mt-4 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? 'bg-gray-800/50 text-white'
                    : 'text-gray-300 hover:bg-gray-800/30 hover:text-white',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150'
                )}
              >
                <item.icon
                  className={classNames(
                    isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-300',
                    'mr-3 h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}

          <button
            onClick={logout}
            className="mt-8 w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/30 hover:text-white rounded-md transition-colors duration-150"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Sign out
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <header className="sticky top-0 z-10 bg-gray-900/50 backdrop-blur-md">
          <div className="flex items-center justify-end h-16 px-4">
            <button
              type="button"
              className="p-1 text-gray-300 hover:text-white focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </header>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
