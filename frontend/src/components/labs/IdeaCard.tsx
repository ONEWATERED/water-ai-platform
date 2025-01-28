'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: string;
}

interface IdeaCardProps {
  title?: string;
  description?: string;
  author?: string;
  category?: string;
  categoryIcon?: string;
  votes?: number;
  comments?: Comment[];
  attachments?: Attachment[];
  timestamp?: string;
}

export function IdeaCard({
  title = "Smart Water Distribution Network",
  description = "Implementing AI-powered sensors for real-time monitoring and predictive maintenance of water distribution networks.",
  author = "John Smith",
  category = "Technology & AI",
  categoryIcon = "🤖",
  votes = 42,
  comments = [],
  attachments = [],
  timestamp = "2 hours ago"
}: IdeaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isVoted, setIsVoted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {/* Card Background Effects */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
      
      {/* Card Content */}
      <div className="relative p-6 bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{categoryIcon}</span>
          <span className="text-sm text-blue-400">{category}</span>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">
          {isExpanded ? description : `${description.slice(0, 100)}...`}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300 ml-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </p>

        {/* Author and Timestamp */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {author[0]}
          </div>
          <div>
            <p className="text-sm text-white">{author}</p>
            <p className="text-xs text-gray-400">{timestamp}</p>
          </div>
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-300 mb-2">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <a
                  key={attachment.id}
                  href={attachment.url}
                  download
                  className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 hover:bg-gray-600 transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {attachment.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <button
            onClick={() => setIsVoted(!isVoted)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
              isVoted
                ? 'bg-blue-500/20 text-blue-400'
                : 'hover:bg-gray-700 text-gray-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill={isVoted ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            {votes}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm text-gray-400 hover:bg-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {comments.length}
          </button>

          <button className="flex items-center gap-1 px-3 py-1 rounded-full text-sm text-gray-400 hover:bg-gray-700 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Comments</h4>
            {comments.length > 0 ? (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">
                        {comment.author[0]}
                      </div>
                      <span className="text-sm text-white">{comment.author}</span>
                      <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No comments yet. Be the first to comment!</p>
            )}
            
            {/* Comment Input */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-gray-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
