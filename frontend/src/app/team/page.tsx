'use client';

import { motion } from 'framer-motion';
import ExpertGrid from '@/components/ExpertGrid';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet our team of experts dedicated to revolutionizing water management through AI and innovative technology.
          </p>
        </motion.div>

        <ExpertGrid />
      </div>
    </div>
  );
}
