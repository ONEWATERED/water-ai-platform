'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  ChatBubbleLeftEllipsisIcon,
  BookmarkIcon,
  ShareIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    community: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    commentCount: number;
    tags: string[];
    imageUrl?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [votes, setVotes] = useState(post.upvotes - post.downvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleVote = (direction: 'up' | 'down') => {
    if (userVote === direction) {
      // Remove vote
      setVotes(votes + (direction === 'up' ? -1 : 1));
      setUserVote(null);
    } else {
      // Add/change vote
      setVotes(votes + (
        direction === 'up' 
          ? (userVote === 'down' ? 2 : 1)
          : (userVote === 'up' ? -2 : -1)
      ));
      setUserVote(direction);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/community/post/' + post.id);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Vote Column */}
      <div className="flex">
        <div className="w-12 bg-gray-50 rounded-l-lg p-2 flex flex-col items-center">
          <button 
            onClick={() => handleVote('up')}
            className={`p-1 rounded hover:bg-gray-200 ${
              userVote === 'up' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <ArrowUpIcon className="h-6 w-6" />
          </button>
          <span className={`text-sm font-medium my-1 ${
            userVote === 'up' 
              ? 'text-orange-500' 
              : userVote === 'down'
                ? 'text-blue-500'
                : 'text-gray-600'
          }`}>
            {votes}
          </span>
          <button 
            onClick={() => handleVote('down')}
            className={`p-1 rounded hover:bg-gray-200 ${
              userVote === 'down' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <ArrowDownIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Link href={`/community/c/${post.community}`} className="font-medium text-blue-600 hover:text-blue-800">
              c/{post.community}
            </Link>
            <span className="mx-1">•</span>
            <span>Posted by</span>
            <Link href={`/community/user/${post.author.name}`} className="ml-1 hover:underline">
              u/{post.author.name}
            </Link>
            <span className="mx-1">•</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>

          {/* Title */}
          <Link href={`/community/post/${post.id}`}>
            <h2 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600">
              {post.title}
            </h2>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/community/tag/${tag}`}
                className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full hover:bg-gray-200"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.content}
          </div>

          {/* Image if exists */}
          {post.imageUrl && (
            <div className="mb-4">
              <Image
                src={post.imageUrl}
                alt="Post image"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4 text-gray-500">
            <Link
              href={`/community/post/${post.id}`}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
              <span className="text-sm">{post.commentCount} Comments</span>
            </Link>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              {isBookmarked ? (
                <BookmarkSolidIcon className="h-5 w-5 text-blue-500" />
              ) : (
                <BookmarkIcon className="h-5 w-5" />
              )}
              <span className="text-sm">Save</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              <ShareIcon className="h-5 w-5" />
              <span className="text-sm">Share</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1">
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
