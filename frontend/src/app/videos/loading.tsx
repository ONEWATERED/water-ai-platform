export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Featured Content Skeleton */}
      <div className="h-[70vh] relative">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
          <div className="max-w-2xl">
            <div className="h-12 w-3/4 bg-gray-700 rounded animate-pulse mb-4" />
            <div className="h-6 w-full bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-6 w-2/3 bg-gray-700 rounded animate-pulse mb-8" />
            <div className="h-12 w-40 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Rows Skeleton */}
      <div className="relative -mt-32">
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="py-8">
            <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-4 mx-8" />
            <div className="flex space-x-4 px-8 overflow-hidden">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex-none w-72">
                  <div className="aspect-video bg-gray-800 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2" />
                  <div className="h-4 w-2/3 bg-gray-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Social Channels Skeleton */}
        <div className="py-12 px-8">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((channel) => (
              <div
                key={channel}
                className="flex flex-col items-center p-6 rounded-xl bg-gray-800 animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-full mb-4" />
                <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                <div className="h-4 w-16 bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
