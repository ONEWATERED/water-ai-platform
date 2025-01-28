import BlogList from '@/components/blog/BlogList';
import { blogPostsData } from '@/lib/data';

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

        {/* Blog List Component */}
        <BlogList initialPosts={blogPostsData} />
      </div>
    </div>
  );
}
