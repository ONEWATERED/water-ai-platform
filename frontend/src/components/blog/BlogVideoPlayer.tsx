'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Loading player...</span>
    </div>
  )
});

interface BlogVideoPlayerProps {
  url: string;
  title: string;
}

export default function BlogVideoPlayer({ url, title }: BlogVideoPlayerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (err: any) => {
    console.error('Video playback error:', err);
    setError('Failed to load video. Please check the URL and try again.');
    setIsLoading(false);
  };

  const handleReady = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-800">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          playing={false}
          onError={handleError}
          onReady={handleReady}
        />
      )}
    </div>
  );
}
