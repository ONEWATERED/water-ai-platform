'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  BuildingOfficeIcon,
  BeakerIcon,
  BookOpenIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { experts } from '@/lib/data';

export default function ExpertsPage() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImageError = (expertId: string) => {
    setImageErrors(prev => ({ ...prev, [expertId]: true }));
  };

  useEffect(() => {
    const loadExperts = async () => {
      try {
        // Simulate loading experts data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    loadExperts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <p className="text-lg font-bold text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <p className="text-lg font-bold text-white">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Meet Our Water Management Experts
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
              Connect with industry leaders who are shaping the future of water management through AI and innovation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 gap-8">
          {experts.map((expert) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Expert Image */}
                <div className="relative w-48 h-48 shrink-0">
                  {imageErrors[expert.id] ? (
                    <div className="w-full h-full rounded-2xl bg-gray-700 flex items-center justify-center">
                      <div className="text-center p-4">
                        <ExclamationTriangleIcon className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Image unavailable</p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={expert.avatarUrl}
                      alt={expert.name}
                      fill
                      className="rounded-2xl object-cover"
                      onError={() => handleImageError(expert.id)}
                    />
                  )}
                </div>

                {/* Expert Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-3">{expert.name}</h2>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-5 w-5 text-indigo-400 mr-2" />
                      <p className="text-indigo-400 font-medium">{expert.role}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{expert.bio}</p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <BeakerIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Specialties</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-500/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Publications */}
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <BookOpenIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Recent Publications</h3>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {expert.publications.map((publication, index) => (
                        <li key={index} className="text-base">{publication}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Connect Button */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={expert.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      Connect on LinkedIn
                      <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                    </a>
                    <Link
                      href={`/avatars/${expert.id}`}
                      className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-xl text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <UserGroupIcon className="mr-2 h-5 w-5" />
                      Chat with Digital Avatar
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
