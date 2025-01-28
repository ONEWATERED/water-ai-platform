'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { experts } from '@/lib/data';

export default function ExpertGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {experts.map((expert, index) => (
        <motion.div
          key={expert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-800">
            <Image
              src={expert.avatarUrl}
              alt={expert.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">{expert.name}</h3>
                <p className="text-indigo-400">{expert.role}</p>
                <p className="text-sm text-gray-300">{expert.bio}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {expert.specialties.slice(0, 3).map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center rounded-full bg-gray-800/50 px-3 py-1 text-sm font-medium text-gray-300"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <Link
                href={`/team/${expert.id}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
