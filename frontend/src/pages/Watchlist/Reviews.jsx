import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReviewCard from '../../components/common/ReviewCard.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import { Button } from '../../components/ui/button.jsx';
import { useReviews } from '../../hooks/useReviews.js';
import { useWatchlistItem } from '../../hooks/useWatchlist.js';

const Reviews = () => {
  const { id } = useParams();
  const loadMoreRef = useRef(null);
  const { data: movie } = useWatchlistItem(id);
  const { reviews, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading, error } = useReviews(id);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorState message="Unable to load reviews." />;

  return (
    <div className="space-y-8 py-10">
      <div>
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">Review Stream</p>
        <h1 className="text-3xl font-semibold">{movie?.title}</h1>
        <p className="text-white/60">Live feedback from the community. Scroll for more.</p>
      </div>

      <motion.div layout className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </motion.div>

      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center">
          <Button variant="ghost" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
      {!hasNextPage && <p className="text-center text-white/50">You’ve reached the end.</p>}
    </div>
  );
};

export default Reviews;


