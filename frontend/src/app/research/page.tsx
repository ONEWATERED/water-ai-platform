'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  AcademicCapIcon,
  ChartBarIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const researchCategories = [
  'All',
  'Water Treatment',
  'Water Quality',
  'Sustainability',
  'Smart Systems',
  'Policy & Governance'
];

const researchPapers = [
  {
    id: '1',
    title: 'Advanced Membrane Technologies for Water Treatment',
    authors: ['Dr. Sarah Chen', 'Dr. Michael Brown'],
    institution: 'Stanford University',
    date: '2024-01-15',
    category: 'Water Treatment',
    abstract: 'This paper explores recent advancements in membrane technology for water treatment applications...',
    citations: 45,
    downloads: 1200,
    link: '#'
  },
  {
    id: '2',
    title: 'AI-Driven Water Quality Monitoring Systems',
    authors: ['Dr. James Wilson', 'Dr. Elena Petrova'],
    institution: 'MIT',
    date: '2024-01-10',
    category: 'Water Quality',
    abstract: 'An investigation into the application of artificial intelligence in real-time water quality monitoring...',
    citations: 32,
    downloads: 890,
    link: '#'
  },
  {
    id: '3',
    title: 'Sustainable Water Management Practices in Urban Areas',
    authors: ['Dr. Lisa Wang', 'Dr. David Kim'],
    institution: 'UC Berkeley',
    date: '2024-01-05',
    category: 'Sustainability',
    abstract: 'This research examines sustainable water management practices in urban environments...',
    citations: 28,
    downloads: 750,
    link: '#'
  },
  {
    id: '4',
    title: 'IoT Integration in Water Distribution Networks',
    authors: ['Dr. Marcus Johnson'],
    institution: 'Georgia Tech',
    date: '2023-12-28',
    category: 'Smart Systems',
    abstract: 'A comprehensive study on implementing IoT solutions in water distribution systems...',
    citations: 19,
    downloads: 560,
    link: '#'
  },
  {
    id: '5',
    title: 'Policy Framework for Water Resource Management',
    authors: ['Dr. Anna Kowalski', 'Dr. Michael Brown'],
    institution: 'Harvard University',
    date: '2023-12-20',
    category: 'Policy & Governance',
    abstract: 'Analysis of current policy frameworks and recommendations for improved water resource management...',
    citations: 25,
    downloads: 680,
    link: '#'
  }
];

export default function ResearchPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPapers = researchPapers.filter(paper => {
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.authors.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Water Research Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore cutting-edge research in water management, treatment technologies, and sustainable practices.
            Access peer-reviewed papers, technical reports, and case studies.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <DocumentTextIcon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">1,200+</div>
            <div className="text-sm text-gray-400">Research Papers</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <AcademicCapIcon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-gray-400">Contributing Researchers</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <ChartBarIcon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">50K+</div>
            <div className="text-sm text-gray-400">Monthly Downloads</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <BeakerIcon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">100+</div>
            <div className="text-sm text-gray-400">Partner Institutions</div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {researchCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Research Papers Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-6"
        >
          {filteredPapers.map((paper) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm">
                    <div className="text-indigo-400">
                      {paper.authors.join(', ')}
                    </div>
                    <div className="text-gray-400">
                      {paper.institution}
                    </div>
                    <div className="text-gray-400">
                      {new Date(paper.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {paper.abstract}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-gray-400">
                      {paper.citations} citations
                    </div>
                    <div className="text-gray-400">
                      {paper.downloads} downloads
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-500/30">
                      {paper.category}
                    </span>
                  </div>
                </div>
                <a
                  href={paper.link}
                  className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
