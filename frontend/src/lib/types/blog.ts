export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Publication {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  coverImage: string;
  guidelines: string;
  editors: Author[];
  contributors: Author[];
  branding: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

export interface ArticleVersion {
  id: string;
  content: string;
  title: string;
  description: string;
  createdAt: string;
  author: Author;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  status: 'draft' | 'published' | 'archived';
  authors: Author[];
  publication?: Publication;
  tags: string[];
  series?: {
    id: string;
    name: string;
    order: number;
  };
  versions: ArticleVersion[];
  featured: boolean;
  views: number;
  likes: number;
  savedBy: number;
  embeds: {
    type: 'image' | 'video' | 'chart' | 'interactive';
    url: string;
    caption?: string;
    data?: any;
  }[];
}

export interface ReadingList {
  id: string;
  name: string;
  description?: string;
  articles: Article[];
  userId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  parentId?: string;
  children?: TopicCategory[];
}

export interface UserPreferences {
  id: string;
  userId: string;
  followedTopics: string[];
  followedAuthors: string[];
  followedPublications: string[];
  readingHistory: {
    articleId: string;
    readAt: string;
    progress: number;
  }[];
  savedArticles: string[];
  readingLists: ReadingList[];
}
