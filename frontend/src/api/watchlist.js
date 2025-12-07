import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from './client';

const MOVIES_KEY = 'movies';
const PLATFORM_KEY = 'platforms';
const USER_WATCHLIST_KEY = 'user-watchlist';

export const useMoviesQuery = () =>
  useQuery({
    queryKey: [MOVIES_KEY],
    queryFn: () => client.get('/watchlist/'),
    staleTime: 1000 * 60 * 5,
  });

export const usePlatformsQuery = () =>
  useQuery({
    queryKey: [PLATFORM_KEY],
    queryFn: () => client.get('/platforms/'),
    staleTime: 1000 * 60 * 10,
  });

export const useWatchlistItemQuery = (id, options = {}) =>
  useQuery({
    queryKey: [MOVIES_KEY, id],
    queryFn: () => client.get(`/watchlist/${id}/`),
    enabled: Boolean(id),
    ...options,
  });

export const useUserWatchlistQuery = (options = {}) =>
  useQuery({
    queryKey: [USER_WATCHLIST_KEY],
    queryFn: () => client.get('/my-watchlist/'),
    ...options,
  });

export const useAddToWatchlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (movieId) => client.post('/my-watchlist/', { movie_id: movieId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_WATCHLIST_KEY] });
    },
  });
};

export const useRemoveFromWatchlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (entryId) => client.delete(`/my-watchlist/${entryId}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_WATCHLIST_KEY] });
    },
  });
};

