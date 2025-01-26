'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function MultimediaPage() {
  const { user } = useAuth();
  const [media, setMedia] = useState([
    { 
      id: 1, 
      title: 'Introduction to AI', 
      type: 'Video',
      description: 'An overview of Artificial Intelligence and its applications.',
      duration: '45 minutes'
    },
    { 
      id: 2, 
      title: 'Tech Trends Podcast', 
      type: 'Audio',
      description: 'Discussing the latest trends in technology.',
      duration: '1 hour'
    },
    { 
      id: 3, 
      title: 'Advanced Water Treatment Technologies', 
      type: 'YouTube Video',
      description: 'A comprehensive overview of cutting-edge water treatment technologies, exploring membrane filtration, advanced oxidation processes, and sustainable purification techniques.',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      duration: '45 minutes',
      channel: 'Water Engineering Institute'
    },
    { 
      id: 4, 
      title: 'Urban Stormwater Management Strategies', 
      type: 'YouTube Video',
      description: 'Exploring innovative approaches to managing stormwater in urban environments, including green infrastructure, flood mitigation, and water quality improvement techniques.',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      duration: '1 hour',
      channel: 'Urban Water Systems'
    },
    { 
      id: 5, 
      title: 'Wastewater Recycling: Turning Challenges into Opportunities', 
      type: 'YouTube Video',
      description: 'A deep dive into wastewater recycling technologies, showcasing how advanced treatment methods can transform wastewater into valuable resources for agriculture, energy production, and potable water.',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      duration: '55 minutes',
      channel: 'Environmental Solutions Network'
    }
  ]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Multimedia</h1>
        <p>Please log in to access our multimedia content.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Multimedia Content</h1>
      {media.map(item => (
        <div key={item.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
          {item.type === 'YouTube Video' ? (
            <div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Channel: {item.channel}</span>
                <span>Duration: {item.duration}</span>
              </div>
              <p className="mb-4">{item.description}</p>
              <div className="bg-gray-200 h-64 flex items-center justify-center mb-4">
                <p className="text-gray-600">YouTube Video Placeholder</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Type: {item.type}</span>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Watch Video
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">Type: {item.type}</p>
              <p className="mb-2">{item.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                Duration: {item.duration}
              </div>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Play
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
