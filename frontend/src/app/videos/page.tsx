'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import {
  PlayIcon,
  ClockIcon,
  UserIcon,
  ExclamationTriangleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import { videos } from '@/lib/videos';
import { formatNumber } from '@/lib/utils';

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const categories = ['all', ...Array.from(new Set(videos.map(video => video.category)))];
  
  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  const handleNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
    const nextIndex = (currentIndex + 1) % videos.length;
    setSelectedVideo(videos[nextIndex]);
    setVideoError(false);
    setIsPlaying(false);
  };

  const handlePreviousVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
    const previousIndex = (currentIndex - 1 + videos.length) % videos.length;
    setSelectedVideo(videos[previousIndex]);
    setVideoError(false);
    setIsPlaying(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Featured Video Player */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800 mb-8">
          {videoError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Error loading video</p>
                <button
                  onClick={() => setVideoError(false)}
                  className="text-indigo-500 hover:text-indigo-400"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <ReactPlayer
              url={selectedVideo.videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              controls
              onError={handleVideoError}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}

          {/* Navigation Buttons */}
          <button
            onClick={handlePreviousVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={handleNextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Video Info */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-white mb-4">{selectedVideo.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={selectedVideo.author.avatar}
                alt={selectedVideo.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-white font-medium">{selectedVideo.author.name}</p>
                <p className="text-sm text-gray-400">Published on {selectedVideo.publishedAt}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-1">
                <UserIcon className="h-5 w-5" />
                <span>{formatNumber(selectedVideo.views)} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-5 w-5" />
                <span>{selectedVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-video rounded-lg overflow-hidden bg-gray-800"
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium line-clamp-2 mb-1">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{video.duration}</span>
                    <span>{formatNumber(video.views)} views</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
