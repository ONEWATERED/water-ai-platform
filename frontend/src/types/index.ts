export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Comment {
  id: string;
  userId: string;
  videoId: string;
  content: string;
  timestamp: string;
  likes: number;
  videoResponse?: {
    url: string;
    thumbnail: string;
    duration: string;
  };
  replies: Comment[];
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  category: string;
  tags: string[];
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  transcript: string;
  likes: number;
  views: number;
  comments: Comment[];
  createdAt: string;
}
