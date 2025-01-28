'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import DraftPreview from '@/components/admin/DraftPreview';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Draft {
  id: string;
  title: string;
  content: string;
  community: string;
  tags: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  sharingToken: string;
}

export default function AdminDraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [communityFilter, setCommunityFilter] = useState('all');

  // Load drafts
  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/community/drafts');
      if (response.ok) {
        const data = await response.json();
        setDrafts(data);
        if (data.length > 0 && !selectedDraft) {
          setSelectedDraft(data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load drafts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDraft = async (draftId: string) => {
    try {
      const response = await fetch(`/api/community/drafts?draftId=${draftId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setDrafts(drafts.filter(draft => draft.id !== draftId));
        if (selectedDraft?.id === draftId) {
          setSelectedDraft(drafts[0] || null);
        }
      }
    } catch (error) {
      console.error('Failed to delete draft:', error);
    }
  };

  const handlePublishDraft = async (draftId: string) => {
    try {
      const draft = drafts.find(d => d.id === draftId);
      if (!draft) return;

      const formData = new FormData();
      formData.append('title', draft.title);
      formData.append('content', draft.content);
      formData.append('community', draft.community);
      formData.append('tags', draft.tags);
      if (draft.imageUrl) {
        formData.append('imageUrl', draft.imageUrl);
      }

      const response = await fetch('/api/community/posts', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const { postId } = await response.json();
        
        // Delete the draft
        await fetch(`/api/community/drafts?draftId=${draftId}`, {
          method: 'DELETE'
        });

        // Redirect to the published post
        router.push(`/community/post/${postId}`);
      }
    } catch (error) {
      console.error('Failed to publish draft:', error);
    }
  };

  const filteredDrafts = drafts.filter(draft => {
    const matchesSearch = draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         draft.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         draft.tags.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCommunity = communityFilter === 'all' || draft.community === communityFilter;
    return matchesSearch && matchesCommunity;
  });

  const communities = ['all', ...Array.from(new Set(drafts.map(draft => draft.community)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Drafts</h1>
            <Link
              href="/community/post/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Post
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drafts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Community filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Community
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={communityFilter}
                  onChange={(e) => setCommunityFilter(e.target.value)}
                >
                  {communities.map(community => (
                    <option key={community} value={community}>
                      {community === 'all' ? 'All Communities' : `c/${community}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Drafts list */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  <ArrowPathIcon className="h-6 w-6 mx-auto animate-spin" />
                  <p className="mt-2">Loading drafts...</p>
                </div>
              ) : filteredDrafts.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No drafts found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredDrafts.map(draft => (
                    <button
                      key={draft.id}
                      onClick={() => setSelectedDraft(draft)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedDraft?.id === draft.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                        {draft.title || 'Untitled Draft'}
                      </h3>
                      <div className="text-sm text-gray-500">
                        <span>c/{draft.community}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {format(new Date(draft.updatedAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1">
            {selectedDraft ? (
              <DraftPreview
                draft={selectedDraft}
                onDelete={handleDeleteDraft}
                onPublish={handlePublishDraft}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                <p>Select a draft to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
