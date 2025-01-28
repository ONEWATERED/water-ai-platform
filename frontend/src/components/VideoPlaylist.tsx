'use client';

import { useState } from 'react';
import { Video } from '@/types/video';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface VideoPlaylistProps {
  videos: Video[];
  currentVideoId: string;
  onVideoSelect: (video: Video) => void;
  playlistTitle: string;
  description?: string;
}

export default function VideoPlaylist({
  videos,
  currentVideoId,
  onVideoSelect,
  playlistTitle,
  description
}: VideoPlaylistProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const currentIndex = videos.findIndex(v => v.id === currentVideoId);
  const progress = ((currentIndex + 1) / videos.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Playlist Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{playlistTitle}</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
        <div className="mt-2">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-blue-600">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {currentIndex + 1}/{videos.length} videos
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video List */}
      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => onVideoSelect(video)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                video.id === currentVideoId ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-16 rounded overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/75 text-white text-xs px-1 rounded">
                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {index + 1}. {video.title}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
