'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
}

export default function BlogCard({
  title,
  description,
  author,
  date,
  readTime,
  image,
  category,
  slug,
}: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800"
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/9]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                <span>{author}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{date}</span>
              </div>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
