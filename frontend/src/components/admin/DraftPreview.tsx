'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { 
  PencilIcon, 
  TrashIcon,
  ShareIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface DraftPreviewProps {
  draft: {
    id: string;
    title: string;
    content: string;
    community: string;
    tags: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
    sharingToken: string;
  };
  onDelete?: (draftId: string) => void;
  onPublish?: (draftId: string) => void;
}

export default function DraftPreview({ draft, onDelete, onPublish }: DraftPreviewProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showSharingTooltip, setShowSharingTooltip] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    // Sanitize and render markdown content
    const renderedContent = marked(draft.content || '') as string;
    const sanitized = DOMPurify.sanitize(renderedContent);
    setSanitizedContent(sanitized);
  }, [draft.content]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/community/post/new?draftId=${draft.id}&sharingToken=${draft.sharingToken}`;
    await navigator.clipboard.writeText(shareUrl);
    setShowSharingTooltip(true);
    setTimeout(() => setShowSharingTooltip(false), 2000);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(draft.id);
      setShowDeleteConfirm(false);
    }
  };

  const handlePublish = () => {
    if (onPublish) {
      onPublish(draft.id);
      setShowPublishConfirm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{draft.title}</h2>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Draft • c/{draft.community}</span>
              <span className="mx-2">•</span>
              <span>Last updated {format(new Date(draft.updatedAt), 'MMM d, yyyy h:mm a')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Share button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
              {showSharingTooltip && (
                <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-gray-900 text-white text-sm rounded">
                  Copied to clipboard!
                </div>
              )}
            </div>

            {/* Edit button */}
            <Link
              href={`/community/post/new?draftId=${draft.id}`}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            >
              <PencilIcon className="h-5 w-5" />
            </Link>

            {/* Delete button */}
            <div className="relative">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              {showDeleteConfirm && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Are you sure you want to delete this draft?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1.5 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Publish button */}
            <div className="relative">
              <button
                onClick={() => setShowPublishConfirm(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Publish
              </button>
              {showPublishConfirm && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Ready to publish this post? This will make it visible to the community.
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowPublishConfirm(false)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePublish}
                      className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {draft.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {draft.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {draft.imageUrl && (
          <div className="mb-6">
            <img
              src={draft.imageUrl}
              alt="Draft preview"
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </div>
  );
}
