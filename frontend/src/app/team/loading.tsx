export default function TeamLoading() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="h-10 bg-gray-800 rounded w-1/3 animate-pulse"></div>
          <div className="mt-6 h-6 bg-gray-800 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="group relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-800 animate-pulse">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  </div>
                  <div className="mt-4">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 bg-gray-700 rounded w-20"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
