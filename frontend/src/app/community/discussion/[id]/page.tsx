'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
  FlagIcon
} from '@heroicons/react/20/solid';

interface DiscussionPageProps {
  params: {
    id: string;
  };
}

interface Comment {
  id: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export default function DiscussionPage({ params }: DiscussionPageProps) {
  const [newComment, setNewComment] = useState('');
  const [discussion] = useState({
    id: parseInt(params.id),
    title: 'Urban Stormwater Management Strategies',
    content: `A comprehensive discussion on innovative approaches to managing stormwater in urban environments. 

    Key points for discussion:
    1. Green infrastructure solutions
    2. Smart drainage systems
    3. Community engagement in stormwater management
    4. Cost-effective implementation strategies
    
    Share your experiences, challenges, and solutions for reducing runoff, preventing flooding, and improving water quality in cities.`,
    author: {
      name: 'Jessica Martinez',
      role: 'Urban Planner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica'
    },
    category: 'Urban Planning',
    tags: ['stormwater', 'urban', 'flood-prevention'],
    timestamp: 'January 22, 2024',
    views: 234,
    likes: 45
  });

  const [comments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: 'Michael Chen',
        role: 'Civil Engineer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
      },
      content: 'Great topic! In our city, we\'ve implemented a combination of rain gardens and permeable pavements that has significantly reduced urban runoff...',
      timestamp: '2 days ago',
      likes: 12,
      replies: [
        {
          id: 2,
          author: {
            name: 'Sarah Wilson',
            role: 'Environmental Scientist',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
          },
          content: 'Could you share more details about the permeable pavement specifications you used? We\'re considering a similar solution.',
          timestamp: '1 day ago',
          likes: 5,
          replies: []
        }
      ]
    }
  ]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/community"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Community
        </Link>

        {/* Discussion Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{discussion.title}</h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img
                src={discussion.author.avatar}
                alt={discussion.author.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{discussion.author.name}</p>
                <p className="text-sm text-gray-500">{discussion.author.role}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Posted on {discussion.timestamp}
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            {discussion.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center text-gray-700 hover:text-blue-600">
                <HandThumbUpIcon className="h-5 w-5 mr-1" />
                {discussion.likes} Likes
              </button>
              <button className="inline-flex items-center text-gray-700 hover:text-blue-600">
                <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                {comments.length} Comments
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center text-gray-700 hover:text-blue-600">
                <ShareIcon className="h-5 w-5 mr-1" />
                Share
              </button>
              <button className="inline-flex items-center text-gray-700 hover:text-red-600">
                <FlagIcon className="h-5 w-5 mr-1" />
                Report
              </button>
            </div>
          </div>
        </div>

        {/* New Comment Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h2>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{comment.author.name}</p>
                    <p className="text-sm text-gray-500">{comment.author.role}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{comment.timestamp}</span>
              </div>

              <p className="text-gray-700 mb-4">{comment.content}</p>

              <div className="flex items-center justify-between">
                <button className="inline-flex items-center text-gray-700 hover:text-blue-600">
                  <HandThumbUpIcon className="h-5 w-5 mr-1" />
                  {comment.likes} Likes
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Reply
                </button>
              </div>

              {/* Nested Replies */}
              {comment.replies.map((reply) => (
                <div key={reply.id} className="ml-8 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{reply.author.name}</p>
                        <p className="text-sm text-gray-500">{reply.author.role}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{reply.timestamp}</span>
                  </div>

                  <p className="text-gray-700 mb-4">{reply.content}</p>

                  <div className="flex items-center justify-between">
                    <button className="inline-flex items-center text-gray-700 hover:text-blue-600">
                      <HandThumbUpIcon className="h-5 w-5 mr-1" />
                      {reply.likes} Likes
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
