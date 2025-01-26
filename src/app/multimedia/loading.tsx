export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-300 mb-4 rounded"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white shadow-md rounded-lg p-6">
              <div className="h-6 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
