export interface Episode {
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export interface Content {
  id: string;
  title: string;
  type: string;
  thumbnail: string;
  episodes?: number;
  status?: string;
  schedule?: string;
  genres?: string[];
  description?: string;
  year?: number;
  rating?: number;
  duration?: string;
  videoUrl?: string;
  teaserUrl?: string;
  youtubeTrailerId?: string;
  youtubeTrailerStart?: number;
  episodeList?: Episode[];
  cast?: string[];
  longDescription?: string;
  contentRating?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  title: string;
  content: Content[];
  type?: 'recommended' | 'top10' | 'personalized' | 'standard' | 'featured';
  reason?: string; // For personalized categories like "Because you watched..."
}

export interface NavCategory {
  id: string;
  title: string;
  subcategories?: NavSubCategory[];
}

export interface NavSubCategory {
  id: string;
  title: string;
  path: string;
}

export interface UserPersona {
  id: string;
  name: string;
  description?: string;
  preferences: {
    genres: string[];
    contentTypes: string[];
    recentlyWatched: string[];
  };
}
