import { motion } from 'framer-motion';
import { Badge } from '../ui/badge.jsx';
import RatingStars from './RatingStars.jsx';
import AddToWatchlistButton from './AddToWatchlistButton.jsx';

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80';

const MovieCard = ({ movie, platform, onClick }) => {
  const poster = movie.poster || FALLBACK_POSTER;
  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col rounded-3xl border border-white/5 bg-white/5 p-4 text-left shadow-lg backdrop-blur-xl"
    >
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-2xl">
        <img
          src={poster}
          alt={movie.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4">
          <Badge>{platform?.name || 'Unknown'}</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
            <span className="text-xs uppercase tracking-[0.4em] text-white/50">{movie.date}</span>
          </div>
          <p className="mt-1 text-sm text-white/70 line-clamp-2">{movie.plot}</p>
        </div>
        {!!movie.cast?.length && (
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-white/50">
            {movie.cast.slice(0, 4).map((actor) => (
              <span
                key={actor}
                className="rounded-full bg-white/10 px-3 py-1 text-white/70 shadow-inner"
              >
                {actor}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <RatingStars value={Number(movie.avg_rating || 0)} interactive={false} />
          <div onClick={(event) => event.stopPropagation()}>
            <AddToWatchlistButton movieId={movie.id} size="sm" variant="secondary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;

