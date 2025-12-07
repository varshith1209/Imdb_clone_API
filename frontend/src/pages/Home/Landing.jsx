import { useNavigate } from 'react-router-dom';
import HeroCard from '../../components/common/HeroCard.jsx';
import AnimatedGrid from '../../components/common/AnimatedGrid.jsx';
import MovieCard from '../../components/common/MovieCard.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import AddToWatchlistButton from '../../components/common/AddToWatchlistButton.jsx';
import { Button } from '../../components/ui/button.jsx';
import { useWatchlist } from '../../hooks/useWatchlist.js';

const Landing = () => {
  const navigate = useNavigate();
  const { movies, platformMap, moviesLoading, moviesError } = useWatchlist();
  const heroMovie = movies[0];

  const goToMyWatchlist = () => navigate('/watchlist');
  const goToCatalog = () => window.scrollTo({ top: 600, behavior: 'smooth' });

  return (
    <div className="space-y-12 py-10">
      <HeroCard
        title={heroMovie ? heroMovie.title : 'Cinematic intelligence delivered in real-time.'}
        description={
          heroMovie
            ? heroMovie.plot
            : 'Track where to stream, explore curated reviews, and drop your own takes. Built for cinephiles and teams who obsess over craftsmanship.'
        }
        highlightImage={heroMovie?.poster}
        badge={heroMovie ? 'Spotlight Title' : 'Curated Cinema'}
        meta={heroMovie?.cast?.slice(0, 3).join(' • ')}
        actions={
          <div className="flex flex-wrap gap-3">
            {heroMovie && <AddToWatchlistButton movieId={heroMovie.id} size="lg" />}
            <Button variant="ghost" size="lg" onClick={goToMyWatchlist}>
              Go to My Watchlist
            </Button>
          </div>
        }
      />

      {moviesLoading && <Loader />}
      {moviesError && <ErrorState message="Unable to load titles right now." />}

      {!moviesLoading && !moviesError && (
        <section className="space-y-4" id="catalog">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">Now streaming</p>
              <h2 className="text-2xl font-semibold">Discover new obsessions</h2>
            </div>
            <button
              className="text-xs uppercase tracking-[0.4em] text-brand hover:text-brand-foreground"
              onClick={goToCatalog}
            >
              Browse
            </button>
          </div>
          <AnimatedGrid>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                platform={platformMap.get(movie.watchlist)}
                onClick={() => navigate(`/watchlist/${movie.id}`)}
              />
            ))}
          </AnimatedGrid>
        </section>
      )}
    </div>
  );
};

export default Landing;

