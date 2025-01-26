'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function CommunityPage() {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState([
    { 
      id: 1, 
      title: 'Urban Stormwater Management Strategies', 
      description: 'A comprehensive discussion on innovative approaches to managing stormwater in urban environments. Share your experiences, challenges, and solutions for reducing runoff, preventing flooding, and improving water quality in cities.',
      author: 'Jessica Martinez, Urban Planner',
      replies: 12,
      lastUpdated: 'January 22, 2024'
    },
    { 
      id: 2, 
      title: 'Wastewater Treatment Technologies: Current Trends', 
      description: 'An open forum to discuss the latest advancements in wastewater treatment. From membrane bioreactors to advanced oxidation processes, let\'s explore how emerging technologies are transforming water recycling and purification.',
      author: 'Dr. Robert Chen, Environmental Engineer',
      replies: 8,
      lastUpdated: 'January 15, 2024'
    },
    { 
      id: 3, 
      title: 'Community Water Conservation Initiatives', 
      description: 'Brainstorm and share successful water conservation strategies implemented in local communities. How can we reduce water consumption, promote sustainable practices, and create more water-resilient neighborhoods?',
      author: 'Sarah Thompson, Sustainability Consultant',
      replies: 15,
      lastUpdated: 'January 20, 2024'
    }
  ]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Water & Environment Community</h1>
        <p>Please log in to participate in discussions about water, wastewater, and environmental technologies.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Water & Environment Community Discussions</h1>
      {discussions.map(discussion => (
        <div key={discussion.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-2">{discussion.title}</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Started by {discussion.author}</span>
            <span>Last Updated: {discussion.lastUpdated}</span>
          </div>
          <p className="mb-4">{discussion.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Replies: {discussion.replies}
            </span>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Join Discussion
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
