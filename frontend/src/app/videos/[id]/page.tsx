'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { 
  HandThumbUpIcon, 
  ShareIcon, 
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { videos } from '@/lib/videos';
import ShareDialog from '@/components/dialogs/ShareDialog';
import VideoComment from '@/components/comments/VideoComment';
import { formatNumber, formatDate } from '@/lib/utils';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  videoUrl?: string;
}

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const video = videos.find(v => v.slug === params?.id);
  const currentUser = {
    name: 'Current User',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=currentuser'
  };

  useEffect(() => {
    if (!video) {
      router.push('/videos');
      return;
    }
    
    setLikeCount(video.likes);
    // Load mock comments
    setComments([
      {
        id: '1',
        user: {
          name: 'Alice Chen',
          avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alice'
        },
        content: 'Great video! Very informative about water conservation.',
        timestamp: '2024-01-15T14:30:00Z',
        likes: 24
      },
      {
        id: '2',
        user: {
          name: 'Bob Smith',
          avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=bob'
        },
        content: 'I learned a lot from this. Looking forward to more content!',
        timestamp: '2024-01-15T15:45:00Z',
        likes: 12,
        videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
      }
    ]);
  }, [video, router]);

  if (!video) {
    return null;
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = async (content: string, videoBlob?: Blob, videoUrl?: string) => {
    // In a real app, you would upload the video to a server here
    let uploadedVideoUrl = videoUrl;
    if (videoBlob) {
      // Mock video upload - in real app, upload to server
      uploadedVideoUrl = URL.createObjectURL(videoBlob);
    }

    const newComment: Comment = {
      id: String(comments.length + 1),
      user: currentUser,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      videoUrl: uploadedVideoUrl
    };

    setComments(prev => [newComment, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="aspect-video w-full relative rounded-xl overflow-hidden bg-gray-800">
          <ReactPlayer
            url={video.videoUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            controls
            onError={() => setVideoError(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-bold">{video.title}</h1>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Image
                src={video.author.avatar}
                alt={video.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{video.author.name}</p>
                <p className="text-sm text-gray-400">{formatDate(video.publishedAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className="flex items-center space-x-2"
              >
                <HandThumbUpIcon
                  className={`h-6 w-6 ${liked ? 'text-blue-500 fill-current' : ''}`}
                />
                <span>{formatNumber(likeCount)}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareDialog(true)}
                className="flex items-center space-x-2"
              >
                <ShareIcon className="h-6 w-6" />
                <span>Share</span>
              </motion.button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            
            <VideoComment
              user={currentUser}
              onSubmit={handleCommentSubmit}
            />

            <div className="mt-8 space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{comment.user.name}</h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(comment.timestamp)}
                        </p>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                      
                      {comment.videoUrl && (
                        <div className="mt-4 relative w-full h-[200px]">
                          <ReactPlayer
                            url={comment.videoUrl}
                            width="100%"
                            height="100%"
                            controls
                            className="rounded-lg overflow-hidden"
                          />
                        </div>
                      )}

                      <div className="mt-4 flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                          <HandThumbUpIcon className="h-5 w-5" />
                          <span>{formatNumber(comment.likes)}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        title={video.title}
        url={`/videos/${video.slug}`}
      />
    </div>
  );
}
