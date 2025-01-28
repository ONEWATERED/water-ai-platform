'use client';

import { useParams } from 'next/navigation';
import { videos } from '@/lib/data';
import VideoPlayer from '@/components/VideoPlayer';
import { getYouTubeId } from '@/lib/utils';

interface VideoPageProps {
  params: {
    slug: string;
  };
}

// Mock current user - In a real app, this would come from your auth system
const mockCurrentUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?u=john'
};

// Mock comments - In a real app, these would come from your backend
const mockComments = [
  {
    id: '1',
    userId: '2',
    videoId: '1',
    content: 'This was really helpful! I especially liked the explanation of the coagulation process.',
    timestamp: '2 hours ago',
    likes: 12,
    replies: []
  },
  {
    id: '2',
    userId: '3',
    videoId: '1',
    content: 'Great video! Could you explain more about the optimal pH levels?',
    timestamp: '1 day ago',
    likes: 8,
    videoResponse: {
      url: 'https://example.com/video-response.mp4',
      thumbnail: 'https://example.com/thumbnail.jpg',
      duration: '0:45'
    },
    replies: [
      {
        id: '3',
        userId: '4',
        videoId: '1',
        content: 'The optimal pH typically ranges from 6.5 to 8.5 depending on the application.',
        timestamp: '20 hours ago',
        likes: 4,
        replies: []
      }
    ]
  }
];

export default function VideoPage() {
  const params = useParams();
  const video = videos.find(v => v.slug === params?.id);

  if (!video) {
    return <div>Video not found</div>;
  }

  const youtubeId = getYouTubeId(video.url);
  if (!youtubeId) {
    return <div>Invalid video URL</div>;
  }

  return <VideoPlayer url={video.url} title={video.title} />;
}
