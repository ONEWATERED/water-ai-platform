import Link from 'next/link';

export default function AuthNotFound() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-700 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Page Not Found</h1>
              <p className="mt-3 text-base text-gray-300">The authentication page you are looking for does not exist.</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Back to login
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
