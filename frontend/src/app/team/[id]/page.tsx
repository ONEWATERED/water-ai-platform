'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { experts } from '@/lib/data';

export default function ExpertProfile() {
  const { id } = useParams();
  
  // Try to find expert by ID first, then by slug
  const expert = experts.find(e => 
    e.id === id || 
    e.name.toLowerCase().replace(/\s+/g, '-') === id
  );

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Expert Not Found</h1>
          <p className="text-gray-400 mb-8">The expert you're looking for doesn't exist.</p>
          <Link
            href="/team"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-800">
              <Image
                src={expert.avatarUrl}
                alt={expert.name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{expert.name}</h1>
              <p className="text-xl text-indigo-400 mb-4">{expert.role}</p>
              <p className="text-gray-300 text-lg">{expert.bio}</p>
            </div>

            {/* Specialties */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {expert.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Publications</h2>
              <ul className="space-y-3">
                {expert.publications.map((publication) => (
                  <li
                    key={publication}
                    className="text-gray-300"
                  >
                    • {publication}
                  </li>
                ))}
              </ul>
            </div>

            {/* LinkedIn */}
            <div>
              <a
                href={expert.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
