'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { HandThumbUpIcon, VideoCameraIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

interface VideoCommentProps {
  user: {
    name: string;
    avatar: string;
  };
  onSubmit: (content: string, videoBlob?: Blob, videoUrl?: string) => void;
}

export default function VideoComment({ user, onSubmit }: VideoCommentProps) {
  const [comment, setComment] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedVideo(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please make sure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setUploadedVideo(URL.createObjectURL(file));
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        alert('Please upload a video file');
      }
    }
  };

  const handleSubmit = () => {
    if (comment.trim() || recordedVideo || uploadedVideo) {
      onSubmit(comment, recordedVideo || undefined, uploadedVideo || undefined);
      setComment('');
      setRecordedVideo(null);
      setUploadedVideo(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col space-y-4 bg-gray-900 p-4 rounded-lg">
      <div className="flex items-start space-x-4">
        <Image
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-grow">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full min-h-[100px] bg-gray-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {previewUrl && (
        <div className="relative w-full h-[200px]">
          <ReactPlayer
            url={previewUrl}
            width="100%"
            height="100%"
            controls
            className="rounded-lg overflow-hidden"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <VideoCameraIcon className="h-5 w-5" />
            <span>{isRecording ? 'Stop Recording' : 'Record Video'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            <PaperClipIcon className="h-5 w-5" />
            <span>Upload Video</span>
          </motion.button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="video/*"
            className="hidden"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!comment.trim() && !recordedVideo && !uploadedVideo}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comment
        </motion.button>
      </div>
    </div>
  );
}
