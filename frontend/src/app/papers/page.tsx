'use client';

import { motion } from 'framer-motion';

export default function ResearchPapersPage() {
  return (
    <div className="min-h-screen bg-gradient-dark pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Research Papers</h1>
          <p className="text-xl text-gray-300 mb-12">
            Access peer-reviewed research papers and technical publications in water technology and management.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Coming Soon</h3>
              <p className="text-gray-300">
                Our team is working on building a comprehensive repository of research papers and technical publications.
                Check back soon for the latest research in water technology.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
