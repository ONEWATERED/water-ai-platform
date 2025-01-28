'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  FireIcon,
  ChartBarIcon,
  ClockIcon,
  SparklesIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import PostCard from '@/components/community/PostCard';
import CommunitySidebar from '@/components/community/CommunitySidebar';
import Template from '@/components/Template';

type SortOption = 'hot' | 'new' | 'top' | 'trending';
type TimeFilter = 'today' | 'week' | 'month' | 'year' | 'all';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  community: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  tags: string[];
  imageUrl?: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Breakthrough in Membrane Filtration Technology',
    content: 'Our team has developed a new type of membrane that shows 50% better efficiency in removing microplastics from water treatment systems. The technology uses a novel polymer structure that...',
    author: {
      name: 'DrWaterTech',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=DrWaterTech&backgroundColor=4F46E5'
    },
    community: 'WaterTech',
    createdAt: '2025-01-26T10:00:00Z',
    upvotes: 156,
    downvotes: 12,
    commentCount: 45,
    tags: ['Research', 'Innovation', 'Filtration'],
    imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=membrane&backgroundColor=4F46E5&width=1200&height=600'
  },
  {
    id: '2',
    title: 'Urban Water Conservation Success Story',
    content: 'Our city just completed a year-long water conservation program that resulted in a 30% reduction in water usage. Here\'s how we did it...',
    author: {
      name: 'WaterPlanner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WaterPlanner'
    },
    community: 'Conservation',
    createdAt: '2025-01-26T08:30:00Z',
    upvotes: 89,
    downvotes: 5,
    commentCount: 23,
    tags: ['conservation', 'urban-planning', 'success-story']
  },
  {
    id: '3',
    title: 'New Research on Sustainable Water Treatment Methods',
    content: 'A recent study published in Water Science Journal reveals promising results for sustainable water treatment using biological processes...',
    author: {
      name: 'ResearchPro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ResearchPro'
    },
    community: 'Research',
    createdAt: '2025-01-26T07:15:00Z',
    upvotes: 234,
    downvotes: 18,
    commentCount: 67,
    tags: ['research', 'sustainability', 'treatment']
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [sortBy, setSortBy] = useState<SortOption>('hot');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions: { value: SortOption; label: string; icon: any }[] = [
    { value: 'hot', label: 'Hot', icon: FireIcon },
    { value: 'new', label: 'New', icon: SparklesIcon },
    { value: 'top', label: 'Top', icon: ChartBarIcon },
    { value: 'trending', label: 'Trending', icon: ChartBarIcon }
  ];

  const timeFilters: { value: TimeFilter; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Template>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">Community</h1>
                <p className="text-indigo-100 text-lg">
                  Join the conversation with water professionals worldwide
                </p>
              </div>
              <Link
                href="/community/post/new"
                className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
              >
                Create Post
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-transparent focus:border-indigo-300 focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Posts Section */}
            <div className="flex-1">
              {/* Sort and Filter Controls */}
              <div className="bg-gray-800 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    {sortOptions.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setSortBy(value)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                          sortBy === value
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white"
                  >
                    <AdjustmentsHorizontalIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">Filters</span>
                  </button>
                </div>

                {/* Time Filter */}
                {showFilters && (
                  <div className="border-t border-gray-700 p-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">Time:</span>
                      {timeFilters.map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => setTimeFilter(value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            timeFilter === value
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-700'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Posts List */}
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <CommunitySidebar />
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
