'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoFeed } from '@/components/toks/VideoFeed';
import { UploadModal } from '@/components/toks/UploadModal';
import { CategoryBar } from '@/components/toks/CategoryBar';
import { sampleToks } from '@/components/toks/sampleToks';

const categories = [
  { id: 'all', name: 'For You', icon: '✨' },
  { id: 'maintenance', name: 'Maintenance', icon: '🔧' },
  { id: 'operations', name: 'Operations', icon: '⚙️' },
  { id: 'safety', name: 'Safety Tips', icon: '⚠️' },
  { id: 'innovation', name: 'Innovation', icon: '💡' },
  { id: 'tutorial', name: 'Tutorials', icon: '📚' },
  { id: 'field', name: 'Field Work', icon: '🏗️' },
  { id: 'tech', name: 'Tech Tips', icon: '💻' }
];

export default function ToksPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isRecording, setIsRecording] = useState(false);

  const filteredToks = selectedCategory === 'all' 
    ? sampleToks 
    : sampleToks.filter(tok => tok.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VideoFeed toks={filteredToks} />
      </div>

      {/* Upload Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsUploadModalOpen(true)}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg 
          shadow-blue-500/20 hover:shadow-blue-500/40 text-white z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </motion.button>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
