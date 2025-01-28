'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import { 
  ChatBubbleLeftIcon, 
  HeartIcon, 
  ShareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface MediaPlayerProps {
  url: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  comments: Comment[];
  onClose: () => void;
}

export default function MediaPlayer({
  url,
  title,
  description,
  author,
  comments: initialComments,
  onClose
}: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(),
      user: {
        name: 'You',
        avatar: '/avatars/default.jpg'
      },
      content: newComment,
      timestamp: new Date().toLocaleString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 text-white hover:text-gray-300"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                playing={isPlaying}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>

            {/* Info */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
              <p className="text-gray-400 mb-4">{description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-white font-medium">{author.name}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-2 text-white hover:text-red-500"
                  >
                    {liked ? (
                      <HeartIconSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-2 text-white hover:text-blue-500"
                  >
                    <ChatBubbleLeftIcon className="w-6 h-6" />
                  </button>
                  <button className="flex items-center space-x-2 text-white hover:text-green-500">
                    <ShareIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-gray-900 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Comments</h3>
                
                {/* Add Comment */}
                <form onSubmit={handleComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">
                            {comment.user.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
