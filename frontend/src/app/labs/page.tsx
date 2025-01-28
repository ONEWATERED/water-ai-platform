'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { IdeaCard } from '@/components/labs/IdeaCard';
import { IdeaSubmissionModal } from '@/components/labs/IdeaSubmissionModal';
import { CategoryFilter } from '@/components/labs/CategoryFilter';
import { SearchBar } from '@/components/labs/SearchBar';
import { sampleIdeas, IdeaType } from '@/components/labs/sampleIdeas';

const categories = [
  { id: 'technology', name: 'Technology & AI', icon: '🤖' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
  { id: 'sensors', name: 'Sensors & IoT', icon: '📡' },
  { id: 'climate', name: 'Climate', icon: '🌡️' },
  { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️' },
  { id: 'community', name: 'Community', icon: '👥' },
  { id: 'innovation', name: 'Innovation', icon: '💡' },
  { id: 'data', name: 'Data & Analytics', icon: '📊' }
];

export default function LabsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredIdeas = useMemo(() => {
    return sampleIdeas.filter(idea => {
      // Category filter
      const categoryMatch = selectedCategory === 'all' || 
        idea.category.toLowerCase().includes(selectedCategory.toLowerCase());

      // Search query filter
      const searchMatch = searchQuery === '' || 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      const statusMatch = selectedStatus === 'all' || idea.status === selectedStatus;

      return categoryMatch && searchMatch && statusMatch;
    });
  }, [selectedCategory, searchQuery, selectedStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              OneWater Labs
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Welcome to the future of water innovation. Share your ideas, collaborate with experts, 
              and help shape the future of water management and sustainability.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105
                shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Submit Your Idea 💡
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="flex flex-col space-y-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search ideas..."
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'proposed', 'under_review', 'in_development', 'funded'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedStatus === status
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              title={idea.title}
              description={idea.description}
              author={idea.author.name}
              category={idea.category}
              categoryIcon={idea.categoryIcon}
              votes={idea.votes}
              comments={idea.comments}
              attachments={idea.attachments}
              timestamp={idea.timestamp}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-400 mb-2">No ideas found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <IdeaSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
