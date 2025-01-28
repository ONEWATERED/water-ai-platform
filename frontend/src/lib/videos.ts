export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
}

export const videos: Video[] = [
  {
    id: '1',
    slug: 'understanding-water-conservation',
    title: 'Understanding Water Conservation',
    description: 'Learn about the importance of water conservation and practical steps to reduce water waste in your daily life.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '5:30',
    views: 1200,
    likes: 450,
    category: 'Education',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=90cdf4'
    },
    publishedAt: '2024-12-15'
  },
  {
    id: '2',
    slug: 'smart-water-management-systems',
    title: 'Smart Water Management Systems',
    description: 'Discover how AI and IoT are revolutionizing water management in smart cities.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '8:45',
    views: 850,
    likes: 320,
    category: 'Technology',
    author: {
      name: 'Alex Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alex&backgroundColor=c0aede'
    },
    publishedAt: '2024-12-20'
  },
  {
    id: '3',
    slug: 'water-treatment-innovation',
    title: 'Water Treatment Innovation',
    description: 'Explore the latest innovations in water treatment technology and their impact on clean water access.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615147342761-9238e15d8b96?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '6:15',
    views: 980,
    likes: 410,
    category: 'Innovation',
    author: {
      name: 'Elena Petrova',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=elena&backgroundColor=ed64a6'
    },
    publishedAt: '2024-12-25'
  },
  {
    id: '4',
    slug: 'sustainable-water-solutions',
    title: 'Sustainable Water Solutions',
    description: 'Learn about sustainable approaches to water management and conservation in urban environments.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '7:20',
    views: 1500,
    likes: 580,
    category: 'Sustainability',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=marcus&backgroundColor=f6ad55'
    },
    publishedAt: '2025-01-01'
  }
];
