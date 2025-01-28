'use client';

import { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
  platform?: string;
  type: 'video' | 'podcast' | 'interview';
}

interface MediaRowProps {
  title: string;
  items: MediaItem[];
  showPlatform?: boolean;
  onItemClick?: (item: MediaItem) => void;
}

export default function MediaRow({ title, items, showPlatform, onItemClick }: MediaRowProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const handleScroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;

    const scrollAmount = direction === 'left' ? -400 : 400;
    rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    setIsScrolling(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  const handleMouseEnter = (id: string) => {
    if (!isScrolling) {
      setHoveredId(id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const handleClick = (item: MediaItem) => {
    if (item.type === 'video') {
      setPlayingId(playingId === item.id ? null : item.id);
    } else {
      onItemClick?.(item);
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-8">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>

        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-8 relative"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-none w-72 relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: hoveredId === item.id ? 1.1 : 1,
                  zIndex: hoveredId === item.id ? 10 : 0,
                }}
                className="relative aspect-video rounded-lg overflow-hidden bg-gray-800"
              >
                {playingId === item.id ? (
                  <div className="absolute inset-0 bg-black">
                    <ReactPlayer
                      url={item.url}
                      width="100%"
                      height="100%"
                      playing
                      controls
                      onEnded={() => setPlayingId(null)}
                    />
                  </div>
                ) : (
                  <>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleClick(item)}
                        className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        <PlayIcon className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>

              <div className="mt-2">
                <h3 className="text-lg font-medium text-white truncate">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{item.duration}</span>
                  {showPlatform && item.platform && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{item.platform}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
