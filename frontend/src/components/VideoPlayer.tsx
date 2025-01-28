'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Template from '@/components/Template';
import dynamic from 'next/dynamic';
import { EyeIcon, HeartIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import CommentSection from '@/components/CommentSection';
import type { Video } from '@/lib/data';

const ReactPlayer = dynamic(() => import('react-player/youtube'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Loading player...</span>
    </div>
  )
});

interface VideoPlayerProps {
  url: string;
  title?: string;
  poster?: string;
  isComment?: boolean;
  onError?: (error: Error) => void;
}

export default function VideoPlayer({ 
  url, 
  title,
  poster,
  isComment = false,
  onError 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Reset video state when URL changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleError = (e: any) => {
    console.error('Video playback error:', e);
    const errorMessage = 'Failed to load video. Please try refreshing the page.';
    setError(errorMessage);
    if (onError) {
      onError(new Error(errorMessage));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Shared Video',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Simplified player for comments
  if (isComment) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          onError={handleError}
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source src={url} type="video/mp4" />
          <source src={url} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Full-featured player for main content
  return (
    <Template>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                playsInline
                preload="metadata"
                poster={poster}
                onError={handleError}
                onPlay={handlePlay}
                onPause={handlePause}
              >
                <source src={url} type="video/mp4" />
                <source src={url} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Actions */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 text-gray-300 hover:text-white`}
                >
                  {isLiked ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                  <span>0</span>
                </button>
                <div className="flex items-center gap-2 text-gray-300">
                  <EyeIcon className="h-6 w-6" />
                  <span>0 views</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <ShareIcon className="h-6 w-6" />
                  Share
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <BookmarkIcon className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} />
                  Save
                </button>
              </div>
            </div>

            {/* Share Options Popup */}
            {/* <div className="mt-2 p-4 bg-gray-800 rounded-lg">
              <button
                onClick={handleCopyLink}
                className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Copy link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
              >
                Share on LinkedIn
              </a>
            </div> */}

            {/* Video Information */}
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              <p className="text-gray-300"></p>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
            </div>

            {/* Comments Section */}
            <CommentSection
              videoId={''}
              comments={[]}
              currentUser={{
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                avatar: 'https://i.pravatar.cc/150?u=john'
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Instructor</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                  </h3>
                  <p className="text-gray-400"></p>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className="mt-6 bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Transcript</h2>
              <div className="space-y-2">
                <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
