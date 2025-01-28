'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import BlogCard from './BlogCard';
import type { BlogPostData } from '@/lib/data';

const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'technology', name: 'Technology' },
  { id: 'sustainability', name: 'Sustainability' },
  { id: 'smart-cities', name: 'Smart Cities' },
  { id: 'ai-ml', name: 'AI & ML' },
  { id: 'quality', name: 'Quality Control' },
];

interface BlogListProps {
  initialPosts: BlogPostData[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || 
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-gray-800 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <Tab.Group onChange={(index) => setSelectedCategory(categories[index].id)}>
          <Tab.List className="flex space-x-2 rounded-xl bg-gray-800 p-1 max-w-3xl mx-auto">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                  ${
                    selected
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
              readTime={post.readTime}
              image={post.image}
              category={post.category}
              slug={post.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No articles found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
