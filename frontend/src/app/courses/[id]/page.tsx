'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  StarIcon, 
  CheckIcon, 
  PlayIcon,
  DocumentTextIcon 
} from '@heroicons/react/outline';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import CourseEnrollmentModal from '@/components/CourseEnrollmentModal';
import CourseReviews from '@/components/CourseReviews';

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
  };
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  thumbnail: string;
  price: number;
  categories: string[];
  curriculum: {
    week: number;
    title: string;
    topics: string[];
  }[];
  learningOutcomes: string[];
  prerequisites: string[];
}

export default function CourseDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`/api/courses/${params.id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error || 'Course not found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Course Overview Sidebar */}
          <div className="md:col-span-1 bg-white shadow-lg rounded-2xl p-6 h-fit">
            <div className="relative h-64 w-full mb-6">
              <Image 
                src={course.thumbnail} 
                alt={course.title} 
                fill 
                className="object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    course.difficulty === 'Beginner' 
                      ? 'bg-green-50 text-green-600'
                      : course.difficulty === 'Intermediate'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'bg-red-50 text-red-600'
                  }
                `}>
                  {course.difficulty}
                </span>
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <span>{course.rating}/5</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-blue-500" />
                <span>{course.duration}</span>
              </div>
              
              <div className="text-2xl font-bold text-blue-900">
                ${course.price}
              </div>
              
              <button 
                onClick={() => setIsEnrollmentModalOpen(true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Enroll Now - ${course.price}
              </button>
            </div>
          </div>

          {/* Course Content */}
          <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-8">
            {/* Navigation Tabs */}
            <div className="flex mb-8 border-b">
              {['overview', 'curriculum', 'instructor'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`
                    px-4 py-2 capitalize
                    ${activeSection === section 
                      ? 'border-b-2 border-blue-600 text-blue-600' 
                      : 'text-gray-500'
                    }
                  `}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Sections */}
            {activeSection === 'overview' && (
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-4">
                  {course.title}
                </h1>
                <p className="text-blue-700 mb-6">{course.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    Learning Outcomes
                  </h3>
                  <ul className="space-y-2">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckIcon className="h-5 w-5 text-green-500" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    Prerequisites
                  </h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'curriculum' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                  Course Curriculum
                </h2>
                {course.curriculum.map((week) => (
                  <div 
                    key={week.week} 
                    className="mb-6 p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">
                        Week {week.week}: {week.title}
                      </h3>
                      <PlayIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <ul className="space-y-2">
                      {week.topics.map((topic, index) => (
                        <li 
                          key={index} 
                          className="flex items-center space-x-2"
                        >
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'instructor' && (
              <div>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative h-24 w-24">
                    <Image 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900">
                      {course.instructor.name}
                    </h2>
                    <p className="text-blue-700">Course Instructor</p>
                  </div>
                </div>
                <p className="text-blue-600">{course.instructor.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Reviews Section */}
        <div className="mt-12">
          <CourseReviews courseId={params.id} />
        </div>
      </div>

      {/* Enrollment Modal */}
      <CourseEnrollmentModal 
        courseId={params.id}
        courseTitle={course.title}
        price={course.price}
        isOpen={isEnrollmentModalOpen}
        onClose={() => setIsEnrollmentModalOpen(false)}
      />
    </div>
  );
}
