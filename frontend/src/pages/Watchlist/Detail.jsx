import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button.jsx';
import PlatformBadge from '../../components/common/PlatformBadge.jsx';
import RatingStars from '../../components/common/RatingStars.jsx';
import ReviewCard from '../../components/common/ReviewCard.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import ReviewModal from '../../components/common/ReviewModal.jsx';
import AddToWatchlistButton from '../../components/common/AddToWatchlistButton.jsx';
import { useWatchlistItem } from '../../hooks/useWatchlist.js';
import { useReviews } from '../../hooks/useReviews.js';
import { useWatchlist } from '../../hooks/useWatchlist.js';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useWatchlistItem(id);
  const { platforms } = useWatchlist();
  const [open, setOpen] = useState(false);
  const { reviews } = useReviews(id);

  const platform = useMemo(() => platforms.find((p) => p.id === movie?.watchlist), [platforms, movie]);

  if (isLoading) return <Loader />;
  if (error || !movie) return <ErrorState message="Movie not found." onRetry={() => navigate('/watchlist')} />;

  return (
    <div className="space-y-10 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
      >
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-5">
            <p className="text-xs uppercase tracking-[0.6em] text-white/60">{movie.date}</p>
            <h1 className="text-4xl font-semibold">{movie.title}</h1>
            <p className="text-white/70">{movie.plot}</p>
            <div className="flex flex-wrap gap-3">
              {platform && <PlatformBadge name={platform.name} url={platform.website} />}
            </div>
            {!!movie.cast?.length && (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.5em] text-white/60">Cast</p>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span
                      key={actor}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-white/60">Community score</p>
                <RatingStars value={Number(movie.avg_rating)} interactive={false} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-white/60">Total ratings</p>
                <p className="text-3xl font-semibold">{movie.number_rating}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <AddToWatchlistButton movieId={movie.id} />
              <Button onClick={() => setOpen(true)}>Write a review</Button>
              <Button variant="ghost" onClick={() => navigate(`/watchlist/${movie.id}/reviews`)} className="border border-white/20">
                See all reviews
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
            <img
              src={
                movie.poster ||
                'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80'
              }
              alt={movie.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest reviews</h2>
          <button className="text-xs uppercase tracking-[0.4em] text-white/60" onClick={() => navigate(`/watchlist/${movie.id}/reviews`)}>
            View all
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.slice(0, 4).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {reviews.length === 0 && <p className="text-white/60">No reviews yet. Be the first.</p>}
        </div>
      </section>

      <ReviewModal watchlistId={movie.id} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Detail;

