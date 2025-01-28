import BlogList from '@/components/blog/BlogList';
import { blogPostsData } from '@/lib/data';
import Link from 'next/link';

export const metadata = {
  title: 'Blog - Water Knowledge Hub',
  description: 'Discover the latest insights, innovations, and best practices in water management',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Water Knowledge Hub</h1>
          <p className="text-xl text-gray-400">
            Discover the latest insights, innovations, and best practices in water management
          </p>
        </div>

        {/* Blog Navigation */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Blog</h1>
          <Link
            href="/blog/research"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
              rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
              transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            Academic Research
          </Link>
        </div>

        {/* Blog List Component */}
        <BlogList initialPosts={blogPostsData} />
      </div>
    </div>
  );
}
