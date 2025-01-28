import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          404 - Avatar Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          The avatar you are looking for does not exist.
        </p>
        <Link
          href="/avatars"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Avatars
        </Link>
      </div>
    </div>
  )
}
