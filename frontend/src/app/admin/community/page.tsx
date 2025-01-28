'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  FlagIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  replies: number;
  views: number;
  reports: number;
  status: 'active' | 'flagged' | 'archived' | 'deleted';
  createdAt: string;
  lastActivity: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Best practices for water conservation',
    author: 'John Smith',
    content: 'Looking for advice on implementing water conservation methods...',
    category: 'Conservation',
    replies: 15,
    views: 234,
    reports: 0,
    status: 'active',
    createdAt: '2025-01-20T10:00:00Z',
    lastActivity: '2025-01-26T15:30:00Z'
  },
  {
    id: '2',
    title: 'Question about filtration systems',
    author: 'Emily Johnson',
    content: 'Has anyone had experience with reverse osmosis systems?',
    category: 'Technology',
    replies: 8,
    views: 156,
    reports: 2,
    status: 'flagged',
    createdAt: '2025-01-22T14:30:00Z',
    lastActivity: '2025-01-26T12:45:00Z'
  }
];

export default function CommunityManagementPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      // TODO: Implement API call to delete post
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleArchive = async (id: string) => {
    // TODO: Implement API call to archive post
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: 'archived' as const } : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Community Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage community posts, discussions, and reported content
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/community/reports"
            className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            <FlagIcon className="h-5 w-5 mr-2" />
            View Reports ({posts.filter(p => p.reports > 0).length})
          </Link>
          <Link
            href="/admin/community/settings"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Community Settings
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="flagged">Flagged</option>
          <option value="archived">Archived</option>
          <option value="deleted">Deleted</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Conservation">Conservation</option>
          <option value="Research">Research</option>
          <option value="Discussion">Discussion</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserGroupIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">by {post.author}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        Posted on {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                      {post.replies}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <EyeIcon className="h-5 w-5 mr-1" />
                      {post.views}
                    </div>
                    {post.reports > 0 && (
                      <div className="flex items-center text-sm text-red-500">
                        <ExclamationTriangleIcon className="h-5 w-5 mr-1" />
                        {post.reports}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : post.status === 'flagged'
                      ? 'bg-red-100 text-red-800'
                      : post.status === 'archived'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/community/posts/${post.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/admin/community/edit/${post.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleArchive(post.id)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      Archive
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
