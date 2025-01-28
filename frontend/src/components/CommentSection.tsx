'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: User;
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  replies: Comment[];
}

interface CommentSectionProps {
  videoId: string;
  comments: Comment[];
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

// Mock current user - In a real app, this would come from your auth system
const mockCurrentUser: User = {
  id: '1',
  name: 'John Doe',
  avatar: '/avatars/default.jpg'
};

// Mock comments - In a real app, these would come from your backend
const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      id: '2',
      name: 'Alice Johnson',
      avatar: '/avatars/alice.jpg'
    },
    content: 'This was a fascinating read! The section about membrane filtration was particularly enlightening.',
    date: '2024-01-26T10:30:00Z',
    likes: 12,
    replies: []
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Bob Smith',
      avatar: '/avatars/bob.jpg'
    },
    content: 'Great article! Could you elaborate more on the UV disinfection process?',
    date: '2024-01-26T09:15:00Z',
    likes: 8,
    replies: []
  }
];

export default function CommentSection({ videoId, comments: initialComments, currentUser }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: { id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar },
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    if (likedComments.has(commentId)) {
      setLikedComments(prev => {
        const next = new Set(prev);
        next.delete(commentId);
        return next;
      });
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes - 1 }
            : comment
        )
      );
    } else {
      setLikedComments(prev => new Set(prev).add(commentId));
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">Comments</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="sr-only">Add a comment</label>
          <textarea
            id="comment"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className={`
              px-4 py-2 rounded-lg font-medium
              ${newComment.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <Image
                src={comment.user.avatar}
                alt={comment.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{comment.user.name}</h4>
                    <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
                  </div>
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                  >
                    {likedComments.has(comment.id) ? (
                      <HeartIconSolid className="h-5 w-5 text-blue-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                    <span>{comment.likes}</span>
                  </button>
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
