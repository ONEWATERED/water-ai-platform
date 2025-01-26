'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  CheckCircleIcon 
} from '@heroicons/react/outline';
import axios from 'axios';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  thumbnail: string;
  instructor: string;
  duration: string;
  status: 'in-progress' | 'completed' | 'not-started';
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/dashboard/courses', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        setCourses(response.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

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
      <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            My Courses
          </h1>
          <p className="text-blue-600">
            Track your learning progress
          </p>
        </div>
        <div className="flex space-x-2">
          <FilterButton 
            label="All" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')} 
          />
          <FilterButton 
            label="In Progress" 
            active={filter === 'in-progress'} 
            onClick={() => setFilter('in-progress')} 
          />
          <FilterButton 
            label="Completed" 
            active={filter === 'completed'} 
            onClick={() => setFilter('completed')} 
          />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <p className="text-blue-600">
            No courses found. Start exploring our course catalog!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({ 
  label, 
  active, 
  onClick 
}: { 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg transition
        ${active 
          ? 'bg-blue-600 text-white' 
          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        }
      `}
    >
      {label}
    </button>
  );
}

function CourseCard({ course }: { course: Course }) {
  const getStatusIcon = () => {
    switch (course.status) {
      case 'in-progress':
        return <ClockIcon className="h-6 w-6 text-yellow-500" />;
      case 'completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      default:
        return <AcademicCapIcon className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="relative h-48 w-full">
        <Image 
          src={course.thumbnail} 
          alt={course.title} 
          fill 
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">
            {course.title}
          </h2>
          {getStatusIcon()}
        </div>
        <p className="text-blue-600 mb-4">
          {course.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-700 font-semibold">
              {course.instructor}
            </p>
            <p className="text-blue-500">
              {course.duration}
            </p>
          </div>
          <div className="w-16">
            <ProgressBar progress={course.progress} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-blue-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
