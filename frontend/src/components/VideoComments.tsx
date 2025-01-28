'use client';

import { useState } from 'react';
import { VideoComment } from '@/types/video';
import { 
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  VideoCameraIcon
} from '@heroicons/react/20/solid';
import CommentVideoUpload from './CommentVideoUpload';
import VideoPlayer from './VideoPlayer';

interface VideoCommentsProps {
  videoId: string;
  comments?: VideoComment[];
  onAddComment?: (content: string, videoFile?: File) => void;
  onAddReply?: (commentId: string, content: string, videoFile?: File) => void;
  onLikeComment?: (commentId: string) => void;
}

export default function VideoComments({ 
  videoId, 
  comments = [], 
  onAddComment,
  onAddReply,
  onLikeComment
}: VideoCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [commentVideoFile, setCommentVideoFile] = useState<File | null>(null);
  const [replyVideoFile, setReplyVideoFile] = useState<File | null>(null);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showReplyVideoUpload, setShowReplyVideoUpload] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment, commentVideoFile || undefined);
      setNewComment('');
      setCommentVideoFile(null);
      setShowVideoUpload(false);
    }
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim() && onAddReply) {
      onAddReply(commentId, replyContent, replyVideoFile || undefined);
      setReplyContent('');
      setReplyVideoFile(null);
      setReplyingTo(null);
      setShowReplyVideoUpload(false);
    }
  };

  const Comment = ({ comment, isReply = false }: { comment: VideoComment, isReply?: boolean }) => (
    <div className={`flex space-x-4 ${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="font-medium text-gray-900">{comment.author.name}</span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
          
          {/* Video attachment in comment */}
          {comment.videoUrl && (
            <div className="mt-3">
              <VideoPlayer
                url={comment.videoUrl}
                isComment={true}
                onError={(error) => console.error('Comment video error:', error)}
              />
            </div>
          )}

          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={() => onLikeComment?.(comment.id)}
              className="flex items-center text-gray-500 hover:text-blue-600"
            >
              <HandThumbUpIcon className="w-4 h-4 mr-1" />
              {comment.likes}
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center text-gray-500 hover:text-blue-600"
              >
                <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                Reply
              </button>
            )}
          </div>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowReplyVideoUpload(!showReplyVideoUpload)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                title="Attach video"
              >
                <VideoCameraIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSubmitReply(comment.id)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
            
            {showReplyVideoUpload && (
              <CommentVideoUpload
                onVideoSelect={(file) => setReplyVideoFile(file)}
                onClear={() => setReplyVideoFile(null)}
                selectedFile={replyVideoFile}
              />
            )}
          </div>
        )}

        {comment.replies?.map((reply) => (
          <Comment key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
      
      {/* Add comment form */}
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowVideoUpload(!showVideoUpload)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            title="Attach video"
          >
            <VideoCameraIcon className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </div>

        {showVideoUpload && (
          <CommentVideoUpload
            onVideoSelect={(file) => setCommentVideoFile(file)}
            onClear={() => setCommentVideoFile(null)}
            selectedFile={commentVideoFile}
          />
        )}
      </form>

      {/* Comments list */}
      <div className="mt-8">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
