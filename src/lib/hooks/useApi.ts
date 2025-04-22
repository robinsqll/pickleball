import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ApiResponse,
  PaginatedResponse,
  Tournament,
  Club,
  NewsArticle,
} from '../types';
import { tournamentsApi, clubsApi, newsApi } from '../api';

// ---------- Generic helpers ----------

export function useApiQuery<T>(
  key: string[],
  fetcher: () => Promise<ApiResponse<T>>,
  options = {}
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await fetcher();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    ...options,
  });
}

export function useApiMutation<T, TVariables>(
  key: string[],
  mutationFn: (variables: TVariables) => Promise<ApiResponse<T>>,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await mutationFn(variables);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
}

// ---------- Tournaments ----------

export function useTournaments(page = 1, pageSize = 10) {
  return useApiQuery<PaginatedResponse<Tournament>>(
    ['tournaments', page.toString(), pageSize.toString()],
    () => tournamentsApi.getAll(page, pageSize)
  );
}

export function useTournament(id: string) {
  return useApiQuery(['tournament', id], () => tournamentsApi.getById(id));
}

// ---------- Clubs ----------

export function useClubs(page = 1, pageSize = 10) {
  return useApiQuery<PaginatedResponse<Club>>(
    ['clubs', page.toString(), pageSize.toString()],
    () => clubsApi.getAll(page, pageSize)
  );
}

export function useClub(id: string) {
  return useApiQuery(['club', id], () => clubsApi.getById(id));
}

// ---------- News ----------

export function useNews(page = 1, pageSize = 10) {
  return useApiQuery<PaginatedResponse<NewsArticle>>(
    ['news', page.toString(), pageSize.toString()],
    () => newsApi.getAll(page, pageSize)
  );
}

export function useNewsArticle(id: string) {
  return useApiQuery(['news', id], () => newsApi.getById(id));
}
