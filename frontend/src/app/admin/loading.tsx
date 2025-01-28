export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <div className="backdrop-blur-card p-8 animate-pulse">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="backdrop-blur-card p-6 space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="backdrop-blur-card p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
