'use client';

import { useState } from 'react';
import FeaturedMedia from '@/components/media/FeaturedMedia';
import MediaRow from '@/components/media/MediaRow';
import SocialChannels from '@/components/media/SocialChannels';
import MediaPlayer from '@/components/media/MediaPlayer';
import UploadMedia from '@/components/media/UploadMedia';
import { PlusIcon } from '@heroicons/react/24/outline';

// Sample data - replace with actual data from your backend
const featuredContent = {
  title: "The Future of Water Management",
  description: "Explore how AI and machine learning are revolutionizing water treatment and distribution systems worldwide.",
  thumbnail: "https://images.unsplash.com/photo-1581092162384-8987c1d64926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  duration: "45:20",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
};

const videos = [
  {
    id: "1",
    title: "Smart City Water Solutions",
    thumbnail: "https://images.unsplash.com/photo-1617839625591-e5a789593135?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    duration: "25:30",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Learn about innovative solutions for smart city water management.",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    }
  },
  {
    id: "2",
    title: "Water Treatment Technologies",
    thumbnail: "https://images.unsplash.com/photo-1615147342761-9238e15d8b96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "18:45",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Discover the latest advancements in water treatment technologies.",
    author: {
      name: "Prof. Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  },
  // Add more videos...
];

const podcasts = [
  {
    id: "1",
    title: "Water Innovation Today",
    thumbnail: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "55:00",
    type: "podcast",
    url: "https://open.spotify.com/episode/example",
    platform: "Spotify",
    description: "Weekly discussions about water innovation and technology.",
    author: {
      name: "Tech Water Cast",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  },
  // Add more podcasts...
];

const interviews = [
  {
    id: "1",
    title: "Interview with Water Tech Leaders",
    thumbnail: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    duration: "35:45",
    type: "interview",
    url: "https://www.youtube.com/watch?v=example",
    description: "Exclusive interviews with industry leaders in water technology.",
    author: {
      name: "Water Tech Network",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  },
  // Add more interviews...
];

const audioPodcasts = [
  {
    id: "1",
    title: "Water Weekly",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "45:00",
    type: "podcast",
    url: "https://podcasts.apple.com/example",
    platform: "Apple Podcasts",
    description: "Your weekly dose of water industry news and insights.",
    author: {
      name: "Water Industry Today",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  },
  // Add more audio podcasts...
];

export default function VideosPage() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleUpload = async (file: File, metadata: any) => {
    // Implement your upload logic here
    console.log('Uploading file:', file, metadata);
    // After successful upload, you might want to refresh the media lists
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Featured Content */}
      <FeaturedMedia {...featuredContent} />

      {/* Upload Button */}
      <div className="relative z-10">
        <button
          onClick={() => setShowUpload(true)}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative -mt-32">
        {/* Latest Videos */}
        <MediaRow
          title="Latest Videos"
          items={videos}
          onItemClick={setSelectedMedia}
        />

        {/* Popular Podcasts */}
        <MediaRow
          title="Popular Podcasts"
          items={podcasts}
          showPlatform
          onItemClick={setSelectedMedia}
        />

        {/* Expert Interviews */}
        <MediaRow
          title="Expert Interviews"
          items={interviews}
          onItemClick={setSelectedMedia}
        />

        {/* Social Media Channels */}
        <SocialChannels />

        {/* Audio Podcasts */}
        <MediaRow
          title="Audio Podcasts"
          items={audioPodcasts}
          showPlatform
          onItemClick={setSelectedMedia}
        />
      </div>

      {/* Media Player Modal */}
      {selectedMedia && (
        <MediaPlayer
          {...selectedMedia}
          comments={[
            {
              id: '1',
              user: {
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
              },
              content: 'Great insights on water management!',
              timestamp: '2 hours ago'
            },
            // Add more comments...
          ]}
          onClose={() => setSelectedMedia(null)}
        />
      )}

      {/* Upload Modal */}
      {showUpload && (
        <UploadMedia
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}
