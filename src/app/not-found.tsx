'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-700 mb-6">
        The page you are looking for might have been removed, 
        had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex justify-center space-x-4">
        <Link 
          href="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Home
        </Link>
        <Link 
          href="/blog" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Browse Blog
        </Link>
      </div>
    </div>
  );
}
