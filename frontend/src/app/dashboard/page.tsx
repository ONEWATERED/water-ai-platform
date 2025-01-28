'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  AcademicCapIcon, 
  DocumentTextIcon, 
  GlobeAltIcon, 
  PlayIcon,
  VideoCameraIcon,
  FilmIcon,
  PlusIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import RecentActivity from '@/components/dashboard/RecentActivity';
import RecommendedCourses from '@/components/dashboard/RecommendedCourses';

interface DashboardStats {
  coursesEnrolled: number;
  completedCourses: number;
  communityPosts: number;
  watchTime: number;
  totalVideos: number;
  publishedVideos: number;
  totalViews: number;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  lastLogin: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    coursesEnrolled: 0,
    completedCourses: 0,
    communityPosts: 0,
    watchTime: 0,
    totalVideos: 0,
    publishedVideos: 0,
    totalViews: 0
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const [statsResponse, profileResponse] = await Promise.all([
          axios.get('/api/dashboard/stats', { headers }),
          axios.get('/api/user/profile', { headers })
        ]);

        setStats(statsResponse.data);
        setProfile(profileResponse.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Profile */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-12 w-12 text-gray-400" />
              )}
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {profile?.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Last login: {new Date(profile?.lastLogin || '').toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              <Link href="/settings" className="p-2 text-gray-400 hover:text-gray-500">
                <CogIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/videos/new"
              className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <PlusIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-blue-900">Upload New Video</h3>
                <p className="text-sm text-blue-600">Add a new video to your library</p>
              </div>
            </Link>
            <Link
              href="/dashboard/videos"
              className="flex items-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <VideoCameraIcon className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h3 className="font-medium text-indigo-900">Manage Videos</h3>
                <p className="text-sm text-indigo-600">View and edit your videos</p>
              </div>
            </Link>
            <Link
              href="/dashboard/videos/analytics"
              className="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <ChartBarIcon className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-medium text-purple-900">Video Analytics</h3>
                <p className="text-sm text-purple-600">Track video performance</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<FilmIcon className="h-12 w-12 text-blue-500" />}
            title="Total Videos"
            value={stats.totalVideos}
            color="bg-blue-50"
          />
          <StatCard 
            icon={<VideoCameraIcon className="h-12 w-12 text-green-500" />}
            title="Published Videos"
            value={stats.publishedVideos}
            color="bg-green-50"
          />
          <StatCard 
            icon={<GlobeAltIcon className="h-12 w-12 text-purple-500" />}
            title="Total Views"
            value={stats.totalViews}
            color="bg-purple-50"
          />
          <StatCard 
            icon={<PlayIcon className="h-12 w-12 text-red-500" />}
            title="Watch Time (hrs)"
            value={stats.watchTime}
            color="bg-red-50"
          />
        </div>

        {/* Learning Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={<AcademicCapIcon className="h-12 w-12 text-blue-500" />}
            title="Courses Enrolled"
            value={stats.coursesEnrolled}
            color="bg-blue-50"
          />
          <StatCard 
            icon={<DocumentTextIcon className="h-12 w-12 text-green-500" />}
            title="Completed Courses"
            value={stats.completedCourses}
            color="bg-green-50"
          />
          <StatCard 
            icon={<GlobeAltIcon className="h-12 w-12 text-purple-500" />}
            title="Community Posts"
            value={stats.communityPosts}
            color="bg-purple-50"
          />
        </div>

        {/* Activity and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <RecentActivity />
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Courses</h2>
            <RecommendedCourses />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  title, 
  value, 
  color 
}: { 
  icon: React.ReactNode, 
  title: string, 
  value: number,
  color: string 
}) {
  return (
    <div className={`${color} rounded-xl p-6`}>
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <h3 className="text-gray-900 font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
