import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from './client';

const PAGE_SIZE = 5;

const fetchReviews = async ({ watchlistId, pageParam = 0 }) => {
  const data = await client.get(`/watchlist/${watchlistId}/reviews/`);
  const start = pageParam * PAGE_SIZE;
  const slice = data.slice(start, start + PAGE_SIZE);
  return {
    items: slice,
    total: data.length,
    nextPage: start + PAGE_SIZE < data.length ? pageParam + 1 : null,
  };
};

export const useReviewsQuery = (watchlistId) =>
  useInfiniteQuery({
    queryKey: ['reviews', watchlistId],
    queryFn: ({ pageParam = 0 }) => fetchReviews({ watchlistId, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(watchlistId),
  });

export const useCreateReviewMutation = (watchlistId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => client.post(`/watchlist/${watchlistId}/reviews/`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', watchlistId] });
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });
};


