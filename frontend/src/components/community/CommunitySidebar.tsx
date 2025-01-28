'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChartBarIcon,
  UserGroupIcon,
  FireIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const topCommunities = [
  {
    name: 'WaterTreatment',
    members: 45632,
    description: 'Discuss water treatment technologies and innovations'
  },
  {
    name: 'Sustainability',
    members: 32145,
    description: 'Sustainable water management practices'
  },
  {
    name: 'WaterTech',
    members: 28976,
    description: 'Latest in water technology and solutions'
  },
  {
    name: 'Conservation',
    members: 25431,
    description: 'Water conservation strategies and tips'
  },
  {
    name: 'Research',
    members: 21543,
    description: 'Water research and academic discussions'
  }
];

const popularTags = [
  'water-treatment',
  'sustainability',
  'innovation',
  'technology',
  'conservation',
  'research',
  'urban-planning',
  'policy'
];

export default function CommunitySidebar() {
  return (
    <div className="space-y-6">
      {/* Create Post Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Create a Post</h3>
        <Link
          href="/community/post/new"
          className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="inline-block w-5 h-5 mr-2" />
          New Post
        </Link>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <InformationCircleIcon className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Community Guidelines</h3>
        </div>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Be respectful and professional in discussions</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Share accurate and verified information</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Cite sources for technical claims and research</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Keep discussions relevant to water technology</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">5.</span>
            <span>No commercial promotion without proper disclosure</span>
          </li>
        </ul>
      </div>

      {/* Top Communities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Top Communities</h3>
          <Link href="/community/communities" className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {topCommunities.map((community, index) => (
            <Link
              key={community.name}
              href={`/community/c/${community.name.toLowerCase()}`}
              className="flex items-start space-x-3 group"
            >
              <span className="text-gray-400 font-medium">{index + 1}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                  c/{community.name}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {community.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {community.members.toLocaleString()} members
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <Link
              key={tag}
              href={`/community/tag/${tag}`}
              className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <UserGroupIcon className="w-6 h-6 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900">156K</div>
            <div className="text-sm text-gray-500">Members</div>
          </div>
          <div className="text-center">
            <FireIcon className="w-6 h-6 mx-auto text-orange-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">2.3K</div>
            <div className="text-sm text-gray-500">Online</div>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Link href="/community/trending" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
          <ChartBarIcon className="h-5 w-5" />
          <span>Trending</span>
        </Link>
      </div>
    </div>
  );
}
