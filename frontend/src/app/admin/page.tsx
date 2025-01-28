'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  PlusIcon,
  VideoCameraIcon,
  FilmIcon,
  ChartBarIcon,
  UserCircleIcon,
  UsersIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { getAdminStats } from '@/lib/api/admin';

interface AdminCard {
  title: string;
  description: string;
  icon: any;
  link: string;
  buttonText: string;
  actions?: {
    text: string;
    link: string;
    icon: any;
  }[];
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalVideos: number;
  totalPosts: number;
  totalExperts: number;
  totalVendors: number;
}

const adminCards: AdminCard[] = [
  {
    title: 'Vendor Hub',
    description: 'Manage vendor profiles, products, and service listings.',
    icon: BuildingStorefrontIcon,
    link: '/admin/vendors',
    buttonText: 'Add New Vendor',
    actions: [
      {
        text: 'View All',
        link: '/admin/vendors',
        icon: BuildingOfficeIcon
      },
      {
        text: 'Analytics',
        link: '/admin/vendors/analytics',
        icon: ChartBarIcon
      }
    ]
  },
  {
    title: 'AI Experts',
    description: 'Manage AI expert profiles, credentials, and specialties.',
    icon: UserCircleIcon,
    link: '/admin/experts',
    buttonText: 'Add New Expert',
    actions: [
      {
        text: 'View All',
        link: '/admin/experts',
        icon: UsersIcon
      },
      {
        text: 'Analytics',
        link: '/admin/experts/analytics',
        icon: ChartBarIcon
      }
    ]
  },
  {
    title: 'Video Management',
    description: 'Upload, manage, and analyze your video content.',
    icon: VideoCameraIcon,
    link: '/admin/videos',
    buttonText: 'Upload Video',
    actions: [
      {
        text: 'All Videos',
        link: '/admin/videos',
        icon: FilmIcon
      },
      {
        text: 'Analytics',
        link: '/admin/videos/analytics',
        icon: ChartBarIcon
      }
    ]
  },
  {
    title: 'Blog Posts',
    description: 'Create and manage blog posts about water technology and research.',
    icon: DocumentTextIcon,
    link: '/admin/blogs',
    buttonText: 'New Blog Post',
    actions: [
      {
        text: 'All Posts',
        link: '/admin/blogs',
        icon: DocumentTextIcon
      },
      {
        text: 'Analytics',
        link: '/admin/blogs/analytics',
        icon: ChartBarIcon
      }
    ]
  },
  {
    title: 'Courses',
    description: 'Create and manage educational courses and learning materials.',
    icon: AcademicCapIcon,
    link: '/admin/courses',
    buttonText: 'New Course',
    actions: [
      {
        text: 'All Courses',
        link: '/admin/courses',
        icon: AcademicCapIcon
      },
      {
        text: 'Analytics',
        link: '/admin/courses/analytics',
        icon: ChartBarIcon
      }
    ]
  },
  {
    title: 'Community',
    description: 'Moderate discussions and manage community engagement.',
    icon: UserGroupIcon,
    link: '/admin/community',
    buttonText: 'View Discussions',
    actions: [
      {
        text: 'All Posts',
        link: '/admin/community/posts',
        icon: UserGroupIcon
      },
      {
        text: 'Reports',
        link: '/admin/community/reports',
        icon: ChartBarIcon
      }
    ]
  }
];

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load statistics');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Link 
              href="/admin/experts/new"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Expert
            </Link>
            <Link 
              href="/admin/videos/new"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Upload New Video
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">
                <card.icon className="h-8 w-8 text-indigo-500" />
                <h2 className="text-xl font-semibold text-gray-900 ml-3">{card.title}</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                {card.description}
              </p>
              
              <div className="space-y-3">
                <Link 
                  href={card.link}
                  className="inline-flex w-full items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  {card.buttonText}
                </Link>

                {card.actions && (
                  <div className="flex gap-2 mt-2">
                    {card.actions.map((action, actionIndex) => (
                      <Link
                        key={actionIndex}
                        href={action.link}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        <action.icon className="h-5 w-5 mr-2" />
                        {action.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : stats?.totalUsers || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Active Users</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : stats?.activeUsers || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Videos</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : stats?.totalVideos || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Blog Posts</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : stats?.totalPosts || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">AI Experts</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : stats?.totalExperts || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Vendors</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : stats?.totalVendors || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
