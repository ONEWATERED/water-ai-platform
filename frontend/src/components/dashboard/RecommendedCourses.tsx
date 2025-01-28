import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  totalRatings: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function RecommendedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/courses/recommended', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch recommended courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedCourses();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-8">
        <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Complete your profile to get personalized course recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/courses/${course.id}`}
          className="block hover:bg-gray-50 transition-colors rounded-lg p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {course.title}
              </p>
              <p className="text-sm text-gray-500">
                by {course.instructor}
              </p>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(course.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-2 text-xs text-gray-500">
                  ({course.totalRatings} ratings)
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {course.level}
              </span>
              <p className="mt-1 text-xs text-gray-500">
                {course.duration}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
