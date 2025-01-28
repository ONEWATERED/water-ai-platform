export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-800 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-6 w-96 bg-gray-800 rounded-lg animate-pulse mx-auto" />
        </div>

        {/* Avatars Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="h-24 w-24 bg-gray-700 rounded-full animate-pulse mx-auto mb-4" />
              <div className="h-6 w-32 bg-gray-700 rounded-lg animate-pulse mx-auto mb-2" />
              <div className="h-4 w-40 bg-gray-700 rounded-lg animate-pulse mx-auto mb-6" />
              <div className="h-10 w-32 bg-gray-700 rounded-lg animate-pulse mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
