'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoUpload from '@/components/VideoUpload';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Chapter {
  title: string;
  timestamp: number;
  description?: string;
}

export default function NewVideoPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [series, setSeries] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      { title: '', timestamp: 0, description: '' }
    ]);
  };

  const handleRemoveChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleChapterChange = (index: number, field: keyof Chapter, value: string | number) => {
    const newChapters = [...chapters];
    newChapters[index] = {
      ...newChapters[index],
      [field]: value
    };
    setChapters(newChapters);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Implement actual video upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      router.push('/dashboard/videos');
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload New Video</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video Upload */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Video File</h2>
          <VideoUpload />
        </div>

        {/* Video Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Video Details</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="playlist" className="block text-sm font-medium text-gray-700">
                  Playlist
                </label>
                <input
                  type="text"
                  id="playlist"
                  value={playlist}
                  onChange={(e) => setPlaylist(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="series" className="block text-sm font-medium text-gray-700">
                  Series
                </label>
                <input
                  type="text"
                  id="series"
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Chapters</h2>
            <button
              type="button"
              onClick={handleAddChapter}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Chapter
            </button>
          </div>

          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Timestamp (seconds)
                    </label>
                    <input
                      type="number"
                      value={chapter.timestamp}
                      onChange={(e) => handleChapterChange(index, 'timestamp', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      value={chapter.description}
                      onChange={(e) => handleChapterChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveChapter(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isProcessing}
            className={`
              inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              ${isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {isProcessing ? 'Processing...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
}
