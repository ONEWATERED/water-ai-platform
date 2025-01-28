'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Contributor } from './sampleContributors';

interface ContributorShowcaseProps {
  contributor: Contributor;
}

export function ContributorShowcase({ contributor }: ContributorShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        {/* Contributor Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={contributor.logo}
              alt={contributor.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{contributor.name}</h3>
            <p className="text-sm text-gray-400">{contributor.type}</p>
          </div>
        </div>

        {/* Contribution Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {contributor.questionsSubmitted}
            </div>
            <div className="text-xs text-gray-400">Questions Submitted</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {contributor.questionsApproved}
            </div>
            <div className="text-xs text-gray-400">Questions Approved</div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {contributor.badges.map((badge) => (
            <div
              key={badge}
              className="px-3 py-1 text-xs font-medium rounded-full bg-blue-600/20 text-blue-400"
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Recent Questions Preview */}
        {contributor.recentQuestions && contributor.recentQuestions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-sm font-medium text-white mb-3">Recent Questions</h4>
            <ul className="space-y-2">
              {contributor.recentQuestions.map((question, index) => (
                <li key={index} className="text-sm text-gray-400">
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
