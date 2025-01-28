'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import VideoPlayer from './VideoPlayer';

interface VideoDetailProps {
  title: string;
  description: string;
  videoUrl: string;
  transcript?: string;
  instructor?: {
    name: string;
    avatar: string;
    title: string;
  };
  duration?: string;
  level?: string;
  category?: string;
  tags?: string[];
}

export default function VideoDetail({
  title,
  description,
  videoUrl,
  transcript,
  instructor,
  duration,
  level,
  category,
  tags = [],
}: VideoDetailProps) {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Column */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-6">
              <VideoPlayer url={videoUrl} title={title} />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {duration && (
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {duration}
                </span>
              )}
              {level && (
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {level}
                </span>
              )}
              {category && (
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {category}
                </span>
              )}
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <p>{description}</p>
            </div>

            {transcript && (
              <button
                onClick={() => setIsTranscriptOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                View Transcript
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {instructor && (
              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold text-white mb-4">Instructor</h2>
                <div className="flex items-center">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-white font-medium">{instructor.name}</h3>
                    <p className="text-gray-400 text-sm">{instructor.title}</p>
                  </div>
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transcript Dialog */}
      <Dialog
        open={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-semibold text-white">
                Video Transcript
              </Dialog.Title>
              <button
                onClick={() => setIsTranscriptOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none overflow-y-auto max-h-[60vh]">
              <p className="whitespace-pre-line">{transcript}</p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
