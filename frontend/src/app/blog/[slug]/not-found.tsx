'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h2>
        <p className="text-gray-400 mb-8">
          Sorry, we couldn't find the blog post you're looking for. It may have been moved or deleted.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    </div>
  );
}
