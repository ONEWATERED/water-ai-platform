'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  VideoCameraIcon, 
  MicrophoneIcon,
  CloudArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface UploadMediaProps {
  onClose: () => void;
  onUpload: (file: File, metadata: any) => Promise<void>;
}

export default function UploadMedia({ onClose, onUpload }: UploadMediaProps) {
  const [recordingType, setRecordingType] = useState<'video' | 'audio' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async (type: 'video' | 'audio') => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video'
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);

      if (type === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        setRecordedChunks(chunks);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingType(type);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a blob URL for preview
      const blobUrl = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = blobUrl;
      }
      setRecordedChunks([file]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recordedChunks.length === 0) return;

    const mimeType = recordingType === 'video' ? 'video/webm' : 'audio/webm';
    const file = new Blob(recordedChunks, { type: mimeType });

    const metadata = {
      title,
      description,
      type: recordingType,
      timestamp: new Date().toISOString()
    };

    try {
      await onUpload(file, metadata);
      onClose();
    } catch (err) {
      console.error('Error uploading media:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <div className="relative w-full max-w-3xl mx-auto p-6 bg-gray-900 rounded-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Upload Media</h2>

        {!recordingType && !recordedChunks.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => startRecording('video')}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700"
            >
              <VideoCameraIcon className="w-12 h-12 text-blue-500 mb-4" />
              <span className="text-white font-medium">Record Video</span>
            </button>
            <button
              onClick={() => startRecording('audio')}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700"
            >
              <MicrophoneIcon className="w-12 h-12 text-green-500 mb-4" />
              <span className="text-white font-medium">Record Audio</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700"
            >
              <CloudArrowUpIcon className="w-12 h-12 text-purple-500 mb-4" />
              <span className="text-white font-medium">Upload File</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {recordingType === 'video' && (
              <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {isRecording ? (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Stop Recording
                </button>
              </div>
            ) : (
              recordedChunks.length > 0 && (
                <>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {uploadProgress > 0 && (
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setRecordingType(null);
                        setRecordedChunks([]);
                      }}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Upload
                    </button>
                  </div>
                </>
              )
            )}
          </form>
        )}
      </div>
    </motion.div>
  );
}
