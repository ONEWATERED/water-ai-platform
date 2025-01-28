export default function TeamMemberLoading() {
  return (
    <div className="min-h-screen bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="h-6 bg-gray-800 rounded w-24 animate-pulse mb-8"></div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Avatar Section */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-800 animate-pulse"></div>

            {/* Content Section */}
            <div className="space-y-6">
              <div>
                <div className="h-10 bg-gray-800 rounded w-2/3"></div>
                <div className="mt-2 h-6 bg-gray-800 rounded w-1/2"></div>
                <div className="mt-1 h-5 bg-gray-800 rounded w-1/3"></div>
              </div>

              <div className="h-32 bg-gray-800 rounded"></div>

              <div>
                <div className="h-8 bg-gray-800 rounded w-1/4 mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-800 rounded w-24"></div>
                  ))}
                </div>
              </div>

              <div>
                <div className="h-8 bg-gray-800 rounded w-1/4 mb-3"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-800 rounded w-3/4"></div>
                  ))}
                </div>
              </div>

              <div>
                <div className="h-8 bg-gray-800 rounded w-1/4 mb-3"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-800 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
