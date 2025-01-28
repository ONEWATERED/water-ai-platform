'use client';

import { PlayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface FeaturedMediaProps {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export default function FeaturedMedia({ title, description, thumbnail, duration, url }: FeaturedMediaProps) {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
            >
              <PlayIcon className="w-6 h-6" />
              Play
            </a>
            <span className="text-white">{duration}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
