'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  VideoCameraIcon, 
  PlusIcon, 
  ChartBarIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'All Videos', href: '/admin/videos', icon: Squares2X2Icon },
  { name: 'Upload Video', href: '/admin/videos/new', icon: PlusIcon },
  { name: 'Analytics', href: '/admin/videos/analytics', icon: ChartBarIcon },
];

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Video Management</h1>
              <p className="mt-1 text-sm text-gray-400">
                Upload, manage, and analyze your video content
              </p>
            </div>
            <Link
              href="/admin/videos/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Upload Video
            </Link>
          </div>

          <div className="mt-4">
            <div className="sm:hidden">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue={navigation.find((item) => item.href === pathname)?.name}
                onChange={(e) => {
                  const item = navigation.find((item) => item.name === e.target.value);
                  if (item) {
                    window.location.href = item.href;
                  }
                }}
              >
                {navigation.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {navigation.map((item) => {
                  const isCurrent = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        ${
                          isCurrent
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }
                        px-3 py-2 font-medium text-sm rounded-md inline-flex items-center
                      `}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
}
