'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookmarkIcon, 
  HeartIcon,
  ShareIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { 
  BookmarkIcon as BookmarkSolidIcon,
  HeartIcon as HeartSolidIcon,
} from '@heroicons/react/24/solid';
import type { Article, ReadingList } from '@/lib/types/blog';

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  currentUser?: {
    id: string;
    readingLists: ReadingList[];
  };
  onSaveToList?: (listId: string) => Promise<void>;
}

export default function ArticleView({ 
  article, 
  relatedArticles,
  currentUser,
  onSaveToList 
}: ArticleViewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showReadingLists, setShowReadingLists] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save reading progress periodically
  useEffect(() => {
    const saveProgress = () => {
      if (currentUser) {
        // Save progress to user's reading history
        // This would typically be an API call
        console.log('Saving progress:', readingProgress);
      }
    };

    const interval = setInterval(saveProgress, 30000); // Save every 30 seconds
    return () => clearInterval(interval);
  }, [readingProgress, currentUser]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50"
      >
        <div 
          className="h-full bg-indigo-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {article.coverImage && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {article.authors.map((author) => (
                <Link 
                  key={author.id}
                  href={`/authors/${author.id}`}
                  className="flex items-center space-x-2"
                >
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{author.name}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-400">
                <ClockIcon className="h-5 w-5 mr-1" />
                {article.readingTime} min read
              </div>
              <div className="flex items-center text-gray-400">
                <UserGroupIcon className="h-5 w-5 mr-1" />
                {article.views} views
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Article Actions */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            {isLiked ? (
              <HeartSolidIcon className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIcon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={() => setShowReadingLists(true)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            {isSaved ? (
              <BookmarkSolidIcon className="h-6 w-6 text-indigo-500" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <ShareIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-invert max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Related Articles */}
        <div className="border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/articles/${related.slug}`}
                className="group"
              >
                {related.coverImage && (
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                <h3 className="font-semibold mb-2 group-hover:text-indigo-400">
                  {related.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {related.readingTime} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Lists Modal */}
      {showReadingLists && currentUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Save to Reading List</h3>
            <div className="space-y-2">
              {currentUser.readingLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => {
                    onSaveToList?.(list.id);
                    setIsSaved(true);
                    setShowReadingLists(false);
                  }}
                  className="w-full p-3 text-left hover:bg-gray-700 rounded-lg"
                >
                  {list.name}
                  <div className="text-sm text-gray-400">
                    {list.articles.length} articles
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowReadingLists(false)}
              className="mt-4 w-full p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Share Menu */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Share Article</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShareMenu(false);
                }}
                className="w-full p-3 text-left hover:bg-gray-700 rounded-lg"
              >
                Copy link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 hover:bg-gray-700 rounded-lg"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 hover:bg-gray-700 rounded-lg"
              >
                Share on LinkedIn
              </a>
            </div>
            <button
              onClick={() => setShowShareMenu(false)}
              className="mt-4 w-full p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
