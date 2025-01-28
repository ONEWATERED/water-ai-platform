'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  ChartBarIcon, 
  CloudIcon, 
  BeakerIcon,
  CubeTransparentIcon,
  ServerIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const categories = [
  { id: 'climate', name: 'Climate Impact', icon: CloudIcon },
  { id: 'blockchain', name: 'Blockchain', icon: CubeTransparentIcon },
  { id: 'ai', name: 'AI & ML', icon: ServerIcon },
  { id: 'infrastructure', name: 'Infrastructure', icon: BoltIcon },
  { id: 'management', name: 'Asset Management', icon: ChartBarIcon },
  { id: 'quality', name: 'Water Quality', icon: BeakerIcon },
  { id: 'global', name: 'Global News', icon: GlobeAltIcon },
  { id: 'security', name: 'Water Security', icon: ShieldCheckIcon },
];

// Sample news data
const newsData = [
  {
    id: '1',
    category: 'ai',
    title: 'AI Revolutionizes Water Treatment Plants',
    description: 'Machine learning algorithms are now predicting maintenance needs with 99% accuracy.',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://example.com/video1.mp4',
    date: '2025-01-27',
    views: '12.5K',
    duration: '5:30',
    trending: true
  },
  {
    id: '2',
    category: 'blockchain',
    title: 'Blockchain Technology Ensures Water Supply Chain Transparency',
    description: 'New distributed ledger system tracks water from source to tap.',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    videoUrl: 'https://example.com/video2.mp4',
    date: '2025-01-26',
    views: '8.2K',
    duration: '7:15'
  },
  // Add more news items...
];

export default function OneWaterNews() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [featuredNews, setFeaturedNews] = useState(newsData[0]);
  const [filteredNews, setFilteredNews] = useState(newsData);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredNews(newsData.filter(news => news.category === selectedCategory));
    } else {
      setFilteredNews(newsData);
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Breaking News Ticker */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold">BREAKING NEWS</span>
          <div className="overflow-hidden flex-1">
            <motion.div
              animate={{
                x: [0, -1000],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="whitespace-nowrap"
            >
              Global Water Summit 2025 announces breakthrough in desalination technology • 
              AI predicts water scarcity patterns with unprecedented accuracy • 
              Blockchain-based water trading platform launches in California
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      <div className="relative h-[60vh] bg-black">
        <div className="absolute inset-0">
          <img
            src={featuredNews.thumbnail}
            alt={featuredNews.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-8 flex items-end pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                FEATURED
              </span>
              <span className="text-gray-300">{featuredNews.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {featuredNews.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {featuredNews.description}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Watch Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-800 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center space-x-6 py-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>All News</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <motion.div
              key={news.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <img
                  src={news.thumbnail}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 text-white text-sm rounded">
                  {news.duration}
                </div>
                {news.trending && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                    TRENDING
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-blue-400 text-sm">{news.category.toUpperCase()}</span>
                  <span className="text-gray-400 text-sm">{news.date}</span>
                  <span className="text-gray-400 text-sm">{news.views} views</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {news.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {news.description}
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Watch Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
