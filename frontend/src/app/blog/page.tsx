'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function BlogPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: 'The Future of Water Treatment Technologies', 
      content: 'As global water scarcity becomes an increasingly critical issue, innovative water treatment technologies are emerging as key solutions. From advanced membrane filtration to AI-driven purification systems, we explore how cutting-edge technologies are revolutionizing water treatment processes and ensuring sustainable water resources for communities worldwide.',
      author: 'Dr. Emily Waters',
      date: 'January 15, 2024'
    },
    { 
      id: 2, 
      title: 'Stormwater Management: Urban Challenges and Innovative Solutions', 
      content: 'Urban environments face significant challenges in managing stormwater runoff. This article delves into the complex world of stormwater management, discussing green infrastructure, permeable pavements, and advanced drainage systems that help cities mitigate flooding, reduce pollution, and create more resilient urban landscapes.',
      author: 'Alex Rivera, Urban Hydrology Expert',
      date: 'December 20, 2023'
    },
    { 
      id: 3, 
      title: 'Wastewater Recycling: Turning Challenges into Opportunities', 
      content: 'Wastewater is no longer just a disposal problem—it\'s a valuable resource. Our comprehensive analysis explores how advanced recycling technologies are transforming wastewater into potable water, agricultural irrigation sources, and even energy production. Learn about the latest breakthroughs that are changing our approach to water sustainability.',
      author: 'Maria Gonzalez, Environmental Engineer',
      date: 'February 5, 2024'
    }
  ]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Water Insights Blog</h1>
        <p>Please log in to read our latest articles on water technologies and sustainability.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Water Insights Blog</h1>
      {posts.map(post => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>By {post.author}</span>
            <span>{post.date}</span>
          </div>
          <p className="mb-4">{post.content}</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Read Full Article
          </button>
        </div>
      ))}
    </div>
  );
}
