'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  StarIcon, 
  FilterIcon 
} from '@heroicons/react/outline';
import axios from 'axios';
import Navbar from '@/components/Navbar';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  thumbnail: string;
  price: number;
  categories: string[];
}

function getUniqueCategories(courses: Course[]) {
  const allCategories = courses.flatMap(course => course.categories);
  return [...new Set(allCategories)];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'default'>('default');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
        setFilteredCourses(response.data);
        setAvailableCategories(getUniqueCategories(response.data));
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    // Search filter
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Difficulty filter
    if (selectedDifficulty.length > 0) {
      result = result.filter(course => 
        selectedDifficulty.includes(course.difficulty)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(course => 
        course.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    // Price range filter
    result = result.filter(course => 
      course.price >= priceRange.min && course.price <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredCourses(result);
  }, [searchQuery, selectedDifficulty, selectedCategories, priceRange, courses, sortBy]);

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
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <FilterIcon className="h-6 w-6 mr-2 text-blue-600" />
              Filters
            </h3>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-blue-700 mb-2">Search Courses</label>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <label className="block text-blue-700 mb-2">Difficulty</label>
              {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
                <div key={difficulty} className="flex items-center mb-2">
                  <input 
                    type="checkbox"
                    id={difficulty}
                    checked={selectedDifficulty.includes(difficulty)}
                    onChange={() => {
                      setSelectedDifficulty(prev => 
                        prev.includes(difficulty)
                          ? prev.filter(d => d !== difficulty)
                          : [...prev, difficulty]
                      );
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={difficulty}>{difficulty}</label>
                </div>
              ))}
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <label className="block text-blue-700 mb-2">Categories</label>
              {availableCategories.map(category => (
                <div key={category} className="flex items-center mb-2">
                  <input 
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => {
                      setSelectedCategories(prev => 
                        prev.includes(category)
                          ? prev.filter(c => c !== category)
                          : [...prev, category]
                      );
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-blue-700 mb-2">Price Range</label>
              <div className="flex space-x-2">
                <input 
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  placeholder="Min"
                  className="w-1/2 px-2 py-1 border border-blue-300 rounded-lg"
                />
                <input 
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  placeholder="Max"
                  className="w-1/2 px-2 py-1 border border-blue-300 rounded-lg"
                />
              </div>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-blue-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="md:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="bg-white shadow-lg rounded-2xl p-12 text-center">
                <p className="text-blue-600 text-xl">
                  No courses found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300">
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
        </div>
        <p className="text-blue-600 mb-4 line-clamp-3">
          {course.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <AcademicCapIcon className="h-5 w-5 text-blue-500" />
            <span className="text-blue-700">{course.instructor}</span>
          </div>
          <div className="flex items-center space-x-2">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-blue-700">{course.rating}/5</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-blue-500" />
            <span className="text-blue-700">{course.duration}</span>
          </div>
          <Link 
            href={`/courses/${course.id}`} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Enroll - ${course.price}
          </Link>
        </div>
      </div>
    </div>
  );
}
