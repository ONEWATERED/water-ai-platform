'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ResearchSubmissionModal } from '@/components/blog/ResearchSubmissionModal';
import { ResearchCard } from '@/components/blog/ResearchCard';
import { sampleResearch } from '@/components/blog/sampleResearch';

export default function ResearchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Academic Research Hub
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A platform for doctoral and post-doctoral researchers to share their latest findings 
              in water management, sustainability, and innovation.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105
                shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Submit Research 📚
            </button>
          </motion.div>

          {/* University Badge */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              <span className="text-sm font-medium text-blue-400">
                Exclusively for .edu researchers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Research Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleResearch.map((research) => (
            <ResearchCard key={research.id} research={research} />
          ))}
        </div>
      </div>

      {/* Submission Modal */}
      <ResearchSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
