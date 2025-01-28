'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  PhotoIcon,
  XMarkIcon,
  EyeIcon,
  CloudArrowUpIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Rich text editor
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  updatedAt?: string;
}

export default function BlogEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<BlogPost>({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft'
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // Load existing post if editing
  useEffect(() => {
    const postId = searchParams?.get('id');
    if (postId) {
      loadPost(postId);
    }
  }, [searchParams]);

  // Auto-save every 30 seconds
  useEffect(() => {
    let autoSaveInterval: NodeJS.Timeout;

    if (post.title || post.content) {
      autoSaveInterval = setInterval(handleSave, 30000);
    }

    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [post]);

  const loadPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/blog/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
        if (data.coverImage) {
          setImagePreview(data.coverImage);
        }
      }
    } catch (error) {
      console.error('Failed to load post:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  });

  const handleInputChange = (name: string, value: string) => {
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('excerpt', post.excerpt);
      formData.append('tags', post.tags);
      formData.append('status', 'draft');

      if (selectedImage) {
        formData.append('coverImage', selectedImage);
      }

      const url = post.id 
        ? `/api/blog/posts/${post.id}`
        : '/api/blog/posts';
      
      const response = await fetch(url, {
        method: post.id ? 'PUT' : 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setPost(prev => ({
          ...prev,
          id: data.id
        }));
        setLastSaved(new Date().toISOString());
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('excerpt', post.excerpt);
      formData.append('tags', post.tags);
      formData.append('status', 'published');
      formData.append('publishedAt', new Date().toISOString());

      if (selectedImage) {
        formData.append('coverImage', selectedImage);
      }

      const url = post.id 
        ? `/api/blog/posts/${post.id}`
        : '/api/blog/posts';

      const response = await fetch(url, {
        method: post.id ? 'PUT' : 'POST',
        body: formData
      });

      if (response.ok) {
        const { id } = await response.json();
        router.push(`/blog/${id}`);
      }
    } catch (error) {
      console.error('Failed to publish post:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const renderPreview = () => {
    const parsedContent = marked(post.content) as string;
    const sanitizedHtml = DOMPurify.sanitize(parsedContent);
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {imagePreview && (
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={imagePreview}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {post.title || 'Untitled Post'}
            </h1>
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-indigo-200"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-white">
              {post.id ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {lastSaved && (
              <span className="text-sm text-gray-400">
                Last saved: {format(new Date(lastSaved), 'h:mm a')}
              </span>
            )}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isSaving ? (
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              )}
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isPublishing ? (
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <CheckIcon className="h-5 w-5 mr-2" />
              )}
              Publish
            </button>
          </div>
        </div>

        {showPreview ? (
          renderPreview()
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <input
                  type="text"
                  placeholder="Post title"
                  value={post.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-indigo-500 text-xl font-bold"
                />
              </div>

              {/* Content */}
              <div className="prose-editor">
                <ReactQuill
                  theme="snow"
                  value={post.content}
                  onChange={(content) => handleInputChange('content', content)}
                  className="bg-gray-800 text-white rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Cover Image */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Cover Image</h3>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    imagePreview ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-600 hover:border-indigo-500'
                  }`}
                >
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-gray-900/80 rounded-full text-white hover:bg-gray-900"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-400">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Excerpt</h3>
                <textarea
                  placeholder="Brief description of the post..."
                  value={post.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-0 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Tags */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Tags</h3>
                <input
                  type="text"
                  placeholder="Comma-separated tags"
                  value={post.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-0 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
