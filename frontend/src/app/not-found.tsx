'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Page Not Found</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Sorry, we couldn't find the page you're looking for.
            <Link href="/" className="text-blue-400 hover:text-blue-300 ml-2">
              Return home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
