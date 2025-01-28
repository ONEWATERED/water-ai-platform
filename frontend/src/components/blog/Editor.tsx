'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import { debounce } from 'lodash';
import {
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  CubeIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  XMarkIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

const TipTapEditor = dynamic(() => import('./TipTapEditor'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800 rounded-lg" />,
  ssr: false,
});

interface Embed {
  type: 'video' | 'image' | 'chart' | 'interactive';
  url: string;
  caption?: string;
  data?: any;
}

interface EditorArticle {
  title: string;
  description: string;
  content: string;
  embeds: Embed[];
  status?: 'draft' | 'published';
  readingTime?: number;
}

interface EditorProps {
  article: Partial<EditorArticle>;
  onChange: (article: Partial<EditorArticle>) => void;
  onSave: (article: Partial<EditorArticle>) => Promise<void>;
}

export default function Editor({ article, onChange, onSave }: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        // Add media to content
        const newEmbed: Embed = {
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: reader.result as string,
          caption: file.name,
        };
        onChange({
          ...article,
          embeds: [...(article.embeds || []), newEmbed],
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm']
    }
  });

  // Autosave functionality
  const debouncedSave = useCallback(
    debounce(async (data: Partial<EditorArticle>) => {
      setIsSaving(true);
      try {
        await onSave(data);
      } catch (error) {
        console.error('Failed to save:', error);
      } finally {
        setIsSaving(false);
      }
    }, 1000),
    [onSave]
  );

  useEffect(() => {
    if (article.content) {
      debouncedSave(article);
    }
  }, [article, debouncedSave]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleContentChange = (content: string) => {
    // Calculate reading time (assuming 200 words per minute)
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const words = text.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    onChange({
      ...article,
      content,
      readingTime
    });
  };

  // Media embedding menu
  const mediaOptions = [
    { type: 'image' as const, icon: PhotoIcon, label: 'Image' },
    { type: 'video' as const, icon: VideoCameraIcon, label: 'Video' },
    { type: 'chart' as const, icon: ChartBarIcon, label: 'Chart' },
    { type: 'interactive' as const, icon: CubeIcon, label: 'Interactive' },
  ];

  if (!isMounted) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 space-y-4">
          <input
            type="text"
            value={article.title || ''}
            onChange={(e) => onChange({ ...article, title: e.target.value })}
            placeholder="Enter article title..."
            className="text-3xl font-bold focus:outline-none w-full"
          />
          <textarea
            value={article.description || ''}
            onChange={(e) => onChange({ ...article, description: e.target.value })}
            placeholder="Add a brief description..."
            rows={2}
            className="w-full text-gray-600 focus:outline-none resize-none"
          />
          {article.readingTime && (
            <p className="text-sm text-gray-500">
              {article.readingTime} min read
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onChange({ ...article, status: 'draft' })}
            className={`px-4 py-2 rounded-lg ${
              article.status === 'draft'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Save Draft
          </button>
          <button
            onClick={() => onChange({ ...article, status: 'published' })}
            className={`px-4 py-2 rounded-lg ${
              article.status === 'published'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            Publish
          </button>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMediaMenu(!showMediaMenu)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showMediaMenu ? (
            <>
              <XMarkIcon className="h-5 w-5" />
              <span>Close Menu</span>
            </>
          ) : (
            <>
              <PlusIcon className="h-5 w-5" />
              <span>Add Media</span>
            </>
          )}
        </button>

        {showMediaMenu && (
          <div className="absolute top-12 left-0 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
            <div className="grid grid-cols-1 gap-2 min-w-[200px]">
              {mediaOptions.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => {
                    // Handle media type selection
                    if (type === 'image') {
                      // Open file dialog
                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                      fileInput?.click();
                    } else {
                      // Handle other media types
                      const url = prompt(`Enter ${label} URL:`);
                      if (url) {
                        onChange({
                          ...article,
                          embeds: [...(article.embeds || []), {
                            type,
                            url,
                            caption: `${label} embed`
                          }],
                        });
                      }
                    }
                    setShowMediaMenu(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full"
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div {...getRootProps()} className={`
        border-2 border-dashed rounded-lg p-6 cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}>
        <input {...getInputProps()} />
        <div className="text-center">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-blue-500 animate-bounce" />
              <p className="mt-2 text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <>
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop media here, or click to select files
              </p>
            </>
          )}
        </div>
      </div>

      <TipTapEditor
        content={article.content || ''}
        onChange={handleContentChange}
      />

      {article.embeds && article.embeds.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Embedded Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.embeds.map((embed, index) => (
              <div key={index} className="relative group">
                {embed.type === 'image' && (
                  <img
                    src={embed.url}
                    alt={embed.caption || ''}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                {embed.type === 'video' && (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <VideoCameraIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                {/* Add other embed type renderers as needed */}
                <button
                  onClick={() => {
                    onChange({
                      ...article,
                      embeds: (article.embeds || []).filter((_, i) => i !== index)
                    });
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
                {embed.caption && (
                  <p className="mt-1 text-sm text-gray-600">{embed.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isSaving && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          Saving...
        </div>
      )}
    </div>
  );
}
