// Tournament Types
export interface Tournament {
  id: string;
  title: string;
  date: Date;
  location: {
    city: string;
    region: string;
  };
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Pro' | 'Open';
  registrationUrl: string;
  featured?: boolean;
  spotsAvailable: number;
  maxParticipants: number;
}

// Club Types
export interface Club {
  id: string;
  name: string;
  location: {
    city: string;
    region: string;
  };
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  memberCount: number;
  website?: string;
  contactEmail: string;
}

// News Types
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: Date;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  imageSrc: string;
  content?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}