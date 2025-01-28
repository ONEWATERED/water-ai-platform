export interface VideoFormat {
  resolution: string;
  url: string;
  size: number;
}

export interface VideoComment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  replies?: VideoComment[];
  videoUrl?: string; // URL to the attached video
}

export interface VideoChapter {
  title: string;
  startTime: number;
  description: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  uploadedAt: string;
  duration: number;
  thumbnail: string;
  formats: {
    mp4: VideoFormat[];
    webm?: VideoFormat[];
  };
  views: number;
  likes: number;
  comments?: VideoComment[];
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  status?: 'processing' | 'published' | 'draft';
  visibility?: 'public' | 'private' | 'unlisted';
  tags?: string[];
  category?: string;
  chapters?: VideoChapter[];
}
