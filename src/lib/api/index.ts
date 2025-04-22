import { Tournament, Club, NewsArticle, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Generic API caller with error handling
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null as unknown as T,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Tournaments API
export const tournamentsApi = {
  getAll: (page = 1, pageSize = 10) => 
    apiCall<PaginatedResponse<Tournament>>(`/tournaments?page=${page}&pageSize=${pageSize}`),
  
  getById: (id: string) => 
    apiCall<Tournament>(`/tournaments/${id}`),
  
  create: (tournament: Omit<Tournament, 'id'>) => 
    apiCall<Tournament>('/tournaments', {
      method: 'POST',
      body: JSON.stringify(tournament),
    }),
  
  update: (id: string, tournament: Partial<Tournament>) => 
    apiCall<Tournament>(`/tournaments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tournament),
    }),
  
  delete: (id: string) => 
    apiCall<void>(`/tournaments/${id}`, {
      method: 'DELETE',
    }),
};

// Clubs API
export const clubsApi = {
  getAll: (page = 1, pageSize = 10) => 
    apiCall<PaginatedResponse<Club>>(`/clubs?page=${page}&pageSize=${pageSize}`),
  
  getById: (id: string) => 
    apiCall<Club>(`/clubs/${id}`),
  
  create: (club: Omit<Club, 'id'>) => 
    apiCall<Club>('/clubs', {
      method: 'POST',
      body: JSON.stringify(club),
    }),
  
  update: (id: string, club: Partial<Club>) => 
    apiCall<Club>(`/clubs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(club),
    }),
  
  delete: (id: string) => 
    apiCall<void>(`/clubs/${id}`, {
      method: 'DELETE',
    }),
};

// News API
export const newsApi = {
  getAll: (page = 1, pageSize = 10) => 
    apiCall<PaginatedResponse<NewsArticle>>(`/news?page=${page}&pageSize=${pageSize}`),
  
  getById: (id: string) => 
    apiCall<NewsArticle>(`/news/${id}`),
  
  create: (article: Omit<NewsArticle, 'id'>) => 
    apiCall<NewsArticle>('/news', {
      method: 'POST',
      body: JSON.stringify(article),
    }),
  
  update: (id: string, article: Partial<NewsArticle>) => 
    apiCall<NewsArticle>(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    }),
  
  delete: (id: string) => 
    apiCall<void>(`/news/${id}`, {
      method: 'DELETE',
    }),
};