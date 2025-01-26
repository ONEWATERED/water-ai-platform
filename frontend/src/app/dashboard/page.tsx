'use client';

import { useState, useEffect } from 'react';
import { 
  AcademicCapIcon, 
  DocumentTextIcon, 
  GlobeAltIcon, 
  PlayIcon 
} from '@heroicons/react/outline';
import axios from 'axios';

interface DashboardStats {
  coursesEnrolled: number;
  completedCourses: number;
  communityPosts: number;
  watchTime: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    coursesEnrolled: 0,
    completedCourses: 0,
    communityPosts: 0,
    watchTime: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/dashboard/stats', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        setStats(response.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load dashboard statistics');
        setLoading(false);
      }
    };

    fetchDashboardStats();
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
    <div className="space-y-8">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-blue-600">
          Track your learning progress and stay updated with WaterTech Insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <StatCard 
          icon={<PlayIcon className="h-12 w-12 text-red-500" />}
          title="Watch Time (hrs)"
          value={stats.watchTime}
          color="bg-red-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard />
        <RecommendedCoursesCard />
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
    <div className={`${color} p-6 rounded-2xl shadow-md flex items-center space-x-4`}>
      {icon}
      <div>
        <p className="text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-blue-900">{value}</p>
      </div>
    </div>
  );
}

function RecentActivityCard() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch recent activities
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Recent Activity
      </h2>
      {/* Add recent activity list */}
      <div className="text-center text-gray-500">
        No recent activities
      </div>
    </div>
  );
}

function RecommendedCoursesCard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch recommended courses
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Recommended Courses
      </h2>
      {/* Add recommended courses list */}
      <div className="text-center text-gray-500">
        No recommended courses
      </div>
    </div>
  );
}
