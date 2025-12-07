import { useMemo } from 'react';
import { useCreateReviewMutation, useReviewsQuery } from '../api/reviews.js';

export const useReviews = (watchlistId) => {
  const query = useReviewsQuery(watchlistId);

  const flatData = useMemo(() => {
    if (!query.data?.pages) return [];
    return query.data.pages.flatMap((page) => page.items);
  }, [query.data]);

  return {
    ...query,
    reviews: flatData,
    total: query.data?.pages?.[0]?.total ?? 0,
  };
};

export const useCreateReview = (watchlistId) => useCreateReviewMutation(watchlistId);


