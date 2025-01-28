'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  HandThumbUpIcon,
  ChartBarIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  LockClosedIcon,
  LinkIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/20/solid';
import { Video } from '@/types/video';
import DeleteVideoModal from '@/components/DeleteVideoModal';

// Mock data - replace with actual API calls
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Water Treatment',
    description: 'Learn the basics of water treatment processes and understand the fundamental principles behind clean water management.',
    uploadedAt: '2024-01-20T10:00:00Z',
    duration: 1200,
    thumbnail: 'https://i.imgur.com/YoKoMnz.jpg',
    formats: {
      mp4: [
        { 
          resolution: '720p', 
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
          size: 1024 * 1024 * 50 
        }
      ]
    },
    views: 150,
    likes: 45,
    creator: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    status: 'published',
    visibility: 'public',
    tags: ['water treatment', 'engineering', 'environment'],
    category: 'Education'
  },
  {
    id: '2',
    title: 'Advanced Filtration Methods',
    description: 'Deep dive into modern filtration techniques and their applications in water treatment facilities.',
    uploadedAt: '2024-01-22T14:30:00Z',
    duration: 1800,
    thumbnail: 'https://i.imgur.com/YoKoMnz.jpg',
    formats: {
      mp4: [
        { 
          resolution: '720p', 
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
          size: 1024 * 1024 * 75 
        }
      ]
    },
    views: 80,
    likes: 25,
    creator: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    status: 'draft',
    visibility: 'private',
    tags: ['filtration', 'engineering', 'advanced'],
    category: 'Technical'
  }
];

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteVideoId, setDeleteVideoId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = ['all', 'Education', 'Technical', 'Case Study', 'Tutorial'];
  const statuses = ['all', 'published', 'draft', 'processing'];
  const visibilities = ['all', 'public', 'private', 'unlisted'];

  const filteredVideos = videos
    .filter(video => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus;
      const matchesVisibility = selectedVisibility === 'all' || video.visibility === selectedVisibility;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesStatus && matchesVisibility && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          : new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      } else if (sortBy === 'views') {
        return sortOrder === 'desc' ? b.views - a.views : a.views - b.views;
      } else {
        return sortOrder === 'desc' ? b.likes - a.likes : a.likes - b.views;
      }
    });

  const handleDeleteVideo = (videoId: string) => {
    setDeleteVideoId(videoId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteVideoId) {
      setVideos(videos.filter(v => v.id !== deleteVideoId));
      setIsDeleteModalOpen(false);
      setDeleteVideoId(null);
    }
  };

  const handleDuplicateVideo = (video: Video) => {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
      title: `${video.title} (Copy)`,
      status: 'draft' as const,
      views: 0,
      likes: 0,
      uploadedAt: new Date().toISOString(),
    };
    setVideos([...videos, newVideo]);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <GlobeAltIcon className="w-5 h-5 text-green-600" title="Public" />;
      case 'private':
        return <LockClosedIcon className="w-5 h-5 text-red-600" title="Private" />;
      case 'unlisted':
        return <LinkIcon className="w-5 h-5 text-yellow-600" title="Unlisted" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      processing: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your videos, track performance, and control visibility
          </p>
        </div>
        <Link
          href="/dashboard/videos/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Upload New Video
        </Link>
      </div>

      {/* Filters and Sort */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={selectedVisibility}
            onChange={(e) => setSelectedVisibility(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {visibilities.map(visibility => (
              <option key={visibility} value={visibility}>
                {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'likes')}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Upload Date</option>
              <option value="views">Views</option>
              <option value="likes">Likes</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 text-gray-500 hover:text-gray-700"
              title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              <ArrowPathIcon className={`w-5 h-5 transform ${sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Videos Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Video
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Analytics
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVideos.map((video) => (
              <tr key={video.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-32 h-18 relative rounded-md overflow-hidden group">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                        <Link
                          href={`/videos/${video.id}`}
                          className="opacity-0 group-hover:opacity-100 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white" />
                        </Link>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium text-gray-900 truncate">{video.title}</div>
                        {getVisibilityIcon(video.visibility || 'public')}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">{video.description}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {video.tags?.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Size: {formatFileSize(video.formats.mp4[0].size)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(video.status || 'draft')}`}>
                    {(video.status || 'draft').charAt(0).toUpperCase() + (video.status || 'draft').slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center" title="Views">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {video.views.toLocaleString()}
                      </div>
                      <div className="flex items-center" title="Likes">
                        <HandThumbUpIcon className="w-4 h-4 mr-1" />
                        {video.likes.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Link
                        href={`/dashboard/videos/${video.id}/analytics`}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <ChartBarIcon className="w-4 h-4 mr-1" />
                        View Analytics
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div title={new Date(video.uploadedAt).toLocaleString()}>
                    {new Date(video.uploadedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <Link
                      href={`/dashboard/videos/${video.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Edit Video"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDuplicateVideo(video)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Duplicate Video"
                    >
                      <DocumentDuplicateIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Video"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteVideoModal
        isOpen={isDeleteModalOpen}
        videoTitle={videos.find(v => v.id === deleteVideoId)?.title || ''}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteVideoId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
