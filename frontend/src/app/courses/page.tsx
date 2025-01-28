'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  StarIcon,
  FunnelIcon,
  XMarkIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  UserPlusIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import Hero from '@/components/Hero';
import { courses, Course, getLevelBadgeColor } from '@/lib/data';
import ContributeModal from '@/components/forms/ContributeModal';

const categories = ['All', 'Prompt Engineering', 'Blockchain', 'Artificial Intelligence'];
const categoryMapping = {
  'Prompt Engineering': 'prompt_engineering',
  'Blockchain': 'blockchain',
  'Artificial Intelligence': 'artificial_intelligence'
};

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [showGptModal, setShowGptModal] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || course.level === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || 
                          course.category === categoryMapping[selectedCategory as keyof typeof categoryMapping];
    const matchesPrice = course.price <= priceRange;

    return matchesSearch && matchesDifficulty && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <Hero
        title="Expert-Led Water Tech Courses"
        subtitle="Master water management and technology with industry experts"
        size="small"
      >
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700 placeholder-gray-400"
            />
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowAffiliateModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Become a Knowledge Affiliate
            </button>
            <button
              onClick={() => setShowGptModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              Contribute to OneWater GPT
            </button>
          </div>
        </div>
      </Hero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Filters */}
        <div className="hidden md:flex space-x-4 mb-8">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <span className="text-gray-300">Price:</span>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-gray-300">${priceRange}</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-900/50 text-indigo-300 rounded-full border border-indigo-700/50">
                      {course.category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">
                      {course.instructor.name}
                    </div>
                    <div className="text-xs text-indigo-400">
                      {course.instructor.title}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium">{course.rating}</span>
                    <span className="text-gray-400">({course.reviewCount})</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${course.price}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Starts {new Date(course.nextCohortDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{course.spotsLeft} spots left</span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Filters Dialog */}
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        open={isFilterOpen}
        onClose={setIsFilterOpen}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-medium text-white">Filters</Dialog.Title>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price Range: ${priceRange}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Apply Filters
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modals */}
      <ContributeModal
        isOpen={showAffiliateModal}
        onClose={() => setShowAffiliateModal(false)}
        type="affiliate"
      />
      <ContributeModal
        isOpen={showGptModal}
        onClose={() => setShowGptModal(false)}
        type="gpt"
      />
    </div>
  );
}
