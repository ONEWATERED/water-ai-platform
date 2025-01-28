'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function TeamMemberError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Error Loading Team Member</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {error.message || 'An error occurred while loading the team member profile.'}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={reset}
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Try again
            </button>
            <Link
              href="/team"
              className="text-sm font-semibold text-gray-300 hover:text-white"
            >
              Back to team <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
