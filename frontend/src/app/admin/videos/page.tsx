'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  HandThumbUpIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  LinkIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import DeleteVideoModal from '@/components/DeleteVideoModal';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  status: 'published' | 'draft' | 'processing';
  visibility: 'public' | 'private' | 'unlisted';
  createdAt: string;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Water Treatment',
    description: 'Learn the basics of water treatment processes and understand the fundamental principles behind clean water management.',
    thumbnail: 'https://i.imgur.com/YoKoMnz.jpg',
    duration: 1200,
    views: 1500,
    likes: 120,
    status: 'published',
    visibility: 'public',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Advanced Filtration Methods',
    description: 'Deep dive into modern filtration techniques and their applications in water treatment facilities.',
    thumbnail: 'https://i.imgur.com/YoKoMnz.jpg',
    duration: 1800,
    views: 800,
    likes: 65,
    status: 'draft',
    visibility: 'private',
    createdAt: '2024-01-22T14:30:00Z',
  },
];

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const statuses = ['all', 'published', 'draft', 'processing'];
  const visibilities = ['all', 'public', 'private', 'unlisted'];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      processing: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <GlobeAltIcon className="h-5 w-5 text-green-500" title="Public" />;
      case 'private':
        return <LockClosedIcon className="h-5 w-5 text-red-500" title="Private" />;
      case 'unlisted':
        return <LinkIcon className="h-5 w-5 text-yellow-500" title="Unlisted" />;
      default:
        return null;
    }
  };

  const handleDeleteClick = (video: Video) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!videoToDelete) return;

    try {
      // Make API call to delete video
      const response = await fetch(`/api/videos/${videoToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      // Remove video from state
      setVideos(videos.filter(v => v.id !== videoToDelete.id));
      setIsDeleteModalOpen(false);
      setVideoToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete video. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  const filteredVideos = videos.filter(video => {
    const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus;
    const matchesVisibility = selectedVisibility === 'all' || video.visibility === selectedVisibility;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesVisibility && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-400">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-400">
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="visibility" className="block text-sm font-medium text-gray-400">
              Visibility
            </label>
            <select
              id="visibility"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedVisibility}
              onChange={(e) => setSelectedVisibility(e.target.value)}
            >
              {visibilities.map(visibility => (
                <option key={visibility} value={visibility}>
                  {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Thumbnail */}
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-white truncate">
                  {video.title}
                </h3>
                {getVisibilityIcon(video.visibility)}
              </div>

              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {video.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    {video.views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <HandThumbUpIcon className="h-4 w-4 mr-1" />
                    {video.likes.toLocaleString()}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(video.status)}`}>
                  {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
                    title="Edit"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
                    title="Duplicate"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(video)}
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <Link
                  href={`/admin/videos/${video.id}/analytics`}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ChartBarIcon className="h-4 w-4 mr-1" />
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteVideoModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        videoTitle={videoToDelete?.title || ''}
      />
    </div>
  );
}
