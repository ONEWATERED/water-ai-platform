'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Video, VideoChapter } from '@/types/video';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EditVideoPageProps {
  params: {
    id: string;
  };
}

export default function EditVideoPage({ params }: EditVideoPageProps) {
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [series, setSeries] = useState('');
  const [chapters, setChapters] = useState<VideoChapter[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // TODO: Fetch video data from API
    // For now, using mock data
    const mockVideo: Video = {
      id: params.id,
      title: 'Introduction to Water Treatment',
      description: 'Learn the basics of water treatment processes',
      uploadedAt: '2024-01-20T10:00:00Z',
      duration: 1200,
      thumbnail: 'https://example.com/thumbnail1.jpg',
      formats: {
        mp4: [
          { resolution: '1080p', url: '/videos/intro-1080p.mp4', size: 1024 * 1024 * 100 },
          { resolution: '720p', url: '/videos/intro-720p.mp4', size: 1024 * 1024 * 50 },
        ]
      },
      chapters: [
        { title: 'Introduction', startTime: 0, description: 'Overview of the course' },
        { title: 'Basic Concepts', startTime: 300, description: 'Fundamental principles' }
      ],
      views: 150,
      likes: 45,
      creator: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar1.jpg'
      }
    };

    setVideo(mockVideo);
    setTitle(mockVideo.title);
    setDescription(mockVideo.description);
    setChapters(mockVideo.chapters || []);
  }, [params.id]);

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      { title: '', startTime: 0, description: '' }
    ]);
  };

  const handleRemoveChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleChapterChange = (index: number, field: keyof VideoChapter, value: string | number) => {
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
      // TODO: Implement actual video update
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
      router.push('/dashboard/videos');
    } catch (error) {
      console.error('Error updating video:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Video</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Video Preview</h2>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
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
                      Start Time (seconds)
                    </label>
                    <input
                      type="number"
                      value={chapter.startTime}
                      onChange={(e) => handleChapterChange(index, 'startTime', parseInt(e.target.value))}
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className={`
              inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              ${isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {isProcessing ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
