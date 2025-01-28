'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { 
  ShareIcon, 
  BookmarkIcon,
  EllipsisHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface NewsVideoPlayerProps {
  videoUrl: string;
  title: string;
  description: string;
  date: string;
  category: string;
  views: string;
  onClose: () => void;
}

export default function NewsVideoPlayer({
  videoUrl,
  title,
  description,
  date,
  category,
  views,
  onClose
}: NewsVideoPlayerProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
    >
      <div className="relative w-full max-w-7xl mx-auto p-8">
        <button
          onClick={onClose}
          className="absolute -top-4 right-4 text-white hover:text-gray-300"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                playing={isPlaying}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {category}
                    </span>
                    <span className="text-gray-400">{date}</span>
                    <span className="text-gray-400">{views} views</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="text-white hover:text-blue-400"
                  >
                    {isBookmarked ? (
                      <BookmarkSolidIcon className="w-6 h-6" />
                    ) : (
                      <BookmarkIcon className="w-6 h-6" />
                    )}
                  </button>
                  <button className="text-white hover:text-blue-400">
                    <ShareIcon className="w-6 h-6" />
                  </button>
                  <button className="text-white hover:text-blue-400">
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
              <p className="text-gray-300">{description}</p>
            </div>
          </div>

          {/* Related News */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Related News</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex space-x-4">
                  <div className="flex-none w-32 aspect-video rounded-lg overflow-hidden bg-gray-700">
                    <img
                      src={`https://picsum.photos/400/225?random=${item}`}
                      alt="Related news thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium line-clamp-2">
                      Another Important Water News Story
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">5 min ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
