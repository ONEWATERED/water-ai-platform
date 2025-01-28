'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TriviaQuestion } from '@/components/trivia/TriviaQuestion';
import { TriviaSubmissionModal } from '@/components/trivia/TriviaSubmissionModal';
import { ContributorShowcase } from '@/components/trivia/ContributorShowcase';
import { getDailyQuestions } from '@/components/trivia/triviaUtils';
import { topContributors } from '@/components/trivia/sampleContributors';

export default function TriviaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dailyQuestions = getDailyQuestions();

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
              Daily Water Trivia
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Challenge your water knowledge daily! Each question unlocks new insights into the fascinating world of water management.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105
                shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Submit Your Question 🎯
            </button>
          </motion.div>

          {/* Daily Stats */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
              <div className="text-sm text-gray-400">Daily Questions</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
              <div className="text-sm text-gray-400">Question Bank</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">12</div>
              <div className="text-sm text-gray-400">Contributors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {dailyQuestions.map((question, index) => (
            <TriviaQuestion
              key={question.id}
              question={question}
              questionNumber={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Top Contributors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Knowledge Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topContributors.map((contributor) => (
            <ContributorShowcase
              key={contributor.id}
              contributor={contributor}
            />
          ))}
        </div>
      </div>

      {/* Submission Modal */}
      <TriviaSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
