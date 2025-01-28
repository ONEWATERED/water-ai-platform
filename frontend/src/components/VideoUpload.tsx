'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const ACCEPTED_VIDEO_TYPES = {
  'video/mp4': ['.mp4'],
  'video/quicktime': ['.mov'],
  'video/x-msvideo': ['.avi'],
  'video/webm': ['.webm']
};

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create a thumbnail from the video
      const videoUrl = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = videoUrl;
      
      video.addEventListener('loadeddata', () => {
        // Seek to 25% of the video
        video.currentTime = video.duration * 0.25;
      });

      video.addEventListener('seeked', () => {
        // Create a canvas and draw the current frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to thumbnail URL
        const thumbnailUrl = canvas.toDataURL('image/jpeg');
        setThumbnail(thumbnailUrl);
      });

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // TODO: Implement actual video upload and conversion
      // await uploadVideo(file);

    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_VIDEO_TYPES,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 500 // 500MB
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="w-12 h-12 mx-auto text-gray-400" />
        {uploading ? (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Uploading... {uploadProgress}%</p>
          </div>
        ) : (
          <>
            <p className="mt-4 text-lg font-medium text-gray-900">
              {isDragActive ? 'Drop your video here' : 'Drag & drop your video here'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Supports MP4, MOV, AVI, and WebM formats up to 500MB
            </p>
          </>
        )}
      </div>

      {thumbnail && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Generated Thumbnail</h3>
          <div className="mt-2 relative aspect-video rounded-lg overflow-hidden">
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setThumbnail(null)}
            className="mt-2 text-sm text-red-600 hover:text-red-500"
          >
            Remove thumbnail
          </button>
        </div>
      )}
    </div>
  );
}
