'use client';

import { motion } from 'framer-motion';

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-gradient-dark pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Water Technology Webinars</h1>
          <p className="text-xl text-gray-300 mb-12">
            Join live sessions with industry experts and learn about the latest developments in water management.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Coming Soon</h3>
              <p className="text-gray-300">
                We're preparing an exciting series of webinars featuring industry experts and thought leaders.
                Stay tuned for our upcoming schedule.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
