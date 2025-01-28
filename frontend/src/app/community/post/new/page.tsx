'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  PhotoIcon,
  LinkIcon,
  DocumentTextIcon,
  XMarkIcon,
  EyeIcon,
  ShareIcon,
  CloudArrowUpIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const communities = [
  'WaterTech',
  'Conservation',
  'Research',
  'Treatment',
  'Sustainability',
  'Policy',
  'Innovation'
];

interface FormData {
  title: string;
  content: string;
  community: string;
  tags: string;
}

interface DraftData extends FormData {
  id?: string;
  sharingToken?: string;
  imageUrl?: string;
}

const initialFormData: DraftData = {
  title: '',
  content: '',
  community: '',
  tags: '',
};

export default function NewPostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<DraftData>(initialFormData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [sharingToken, setSharingToken] = useState<string | null>(null);
  const [sharingUrl, setSharingUrl] = useState<string | null>(null);
  const [showSharingTooltip, setShowSharingTooltip] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Load draft if draftId is provided
  useEffect(() => {
    const loadDraft = async () => {
      const draftId = searchParams?.get('draftId');
      const sharingToken = searchParams?.get('sharingToken');
      
      if (draftId) {
        try {
          const response = await fetch(
            `/api/community/drafts?draftId=${draftId}${sharingToken ? `&sharingToken=${sharingToken}` : ''}`
          );
          
          if (response.ok) {
            const draft: DraftData = await response.json();
            setFormData(draft);
            setDraftId(draft.id || null);
            setSharingToken(draft.sharingToken || null);
            if (draft.imageUrl) {
              setImagePreview(draft.imageUrl);
            }
          }
        } catch (error) {
          console.error('Failed to load draft:', error);
        }
      }
    };

    loadDraft();
  }, [searchParams]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    let autoSaveInterval: NodeJS.Timeout;

    if (formData.title || formData.content) {
      autoSaveInterval = setInterval(saveDraft, 30000);
    }

    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [formData]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveDraft = async () => {
    try {
      setIsAutoSaving(true);
      const method = draftId ? 'PUT' : 'POST';
      const url = draftId 
        ? `/api/community/drafts?draftId=${draftId}`
        : '/api/community/drafts';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: imagePreview
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!draftId) {
          setDraftId(data.draftId);
          setSharingToken(data.sharingToken);
          const shareUrl = `${window.location.origin}/community/post/new?draftId=${data.draftId}&sharingToken=${data.sharingToken}`;
          setSharingUrl(shareUrl);
        }
        setLastSaved(new Date().toISOString());
      }
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsAutoSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('content', formData.content);
      postData.append('community', formData.community);
      postData.append('tags', formData.tags);
      
      if (selectedImage) {
        postData.append('image', selectedImage);
      }

      // Make API call to create post
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        body: postData
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Delete draft if it exists
      if (draftId) {
        await fetch(`/api/community/drafts?draftId=${draftId}`, {
          method: 'DELETE'
        });
      }

      // Redirect to the new post
      const { postId } = await response.json();
      router.push(`/community/post/${postId}`);
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (sharingUrl) {
      await navigator.clipboard.writeText(sharingUrl);
      setShowSharingTooltip(true);
      setTimeout(() => setShowSharingTooltip(false), 2000);
    }
  };

  const renderPreview = () => {
    const parsedContent = marked(formData.content) as string;
    const sanitizedHtml = DOMPurify.sanitize(parsedContent);
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="prose max-w-none">
          <h1>{formData.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>Posted in c/{formData.community}</span>
            <span>•</span>
            <span>{format(new Date(), 'MMM d, yyyy')}</span>
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Post preview"
              className="w-full max-h-96 object-cover rounded-lg mb-6"
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
          {formData.tags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {formData.tags.split(',').map((tag, index) => (
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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header with controls */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {showPreview ? 'Preview Post' : 'Create a Post'}
          </h1>
          <div className="flex items-center space-x-4">
            {/* Preview toggle */}
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>

            {/* Share draft button */}
            {draftId && (
              <div className="relative">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  <ShareIcon className="h-5 w-5 mr-2" />
                  Share Draft
                </button>
                {showSharingTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded">
                    Copied to clipboard!
                  </div>
                )}
              </div>
            )}

            {/* Save draft button */}
            <button
              type="button"
              onClick={saveDraft}
              disabled={isAutoSaving}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
            >
              {isAutoSaving ? (
                <CloudArrowUpIcon className="h-5 w-5 mr-2 animate-bounce" />
              ) : (
                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              )}
              {isAutoSaving ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Last saved indicator */}
        {lastSaved && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
            Last saved {format(new Date(lastSaved), 'h:mm a')}
          </div>
        )}

        {showPreview ? (
          renderPreview()
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Community Selection */}
                <div>
                  <label htmlFor="community" className="block text-sm font-medium text-gray-700">
                    Community
                  </label>
                  <select
                    id="community"
                    name="community"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.community}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a community</option>
                    {communities.map(community => (
                      <option key={community} value={community}>
                        c/{community}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    maxLength={300}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {300 - formData.title.length} characters remaining
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <div className="mt-1 mb-2 text-sm text-gray-500">
                    Supports Markdown formatting
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    rows={12}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
                    value={formData.content}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image (optional)
                  </label>
                  {!imagePreview ? (
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
                    >
                      <input {...getInputProps()} />
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Drag and drop an image here, or click to select
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      >
                        <XMarkIcon className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    placeholder="Separate tags with commas (e.g., technology, research, innovation)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                      ${isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      }
                    `}
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
