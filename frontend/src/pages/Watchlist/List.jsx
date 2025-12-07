import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input.jsx';
import AnimatedGrid from '../../components/common/AnimatedGrid.jsx';
import MovieCard from '../../components/common/MovieCard.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import { Button } from '../../components/ui/button.jsx';
import { useWatchlist } from '../../hooks/useWatchlist.js';

const List = () => {
  const navigate = useNavigate();
  const { myWatchlist, myWatchlistLoading, myWatchlistError, platformMap } = useWatchlist();
  const [search, setSearch] = useState('');

  const movies = myWatchlist.map((entry) => entry.movie);
  const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">My Watchlist</p>
          <h1 className="text-3xl font-semibold">Everything you’ve saved, in one place.</h1>
          <p className="text-white/60">
            Keep tabs on films you plan to watch and the platforms carrying them.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Input
            placeholder="Search saved titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
          />
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        </div>
      </div>

      {myWatchlistLoading && <Loader />}
      {myWatchlistError && <ErrorState message="Unable to load your watchlist." />}

      {!myWatchlistLoading && !myWatchlistError && (
        <>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/20 p-12 text-center text-white/70">
              <p className="text-lg font-semibold">Your watchlist is feeling lonely.</p>
              <p className="mt-2 text-sm">
                Add titles from the homepage to build your personal slate.
              </p>
              <Button className="mt-6" onClick={() => navigate('/')}>
                Browse titles
              </Button>
            </div>
          ) : (
            <AnimatedGrid>
              {filtered.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  platform={platformMap.get(movie.watchlist)}
                  onClick={() => navigate(`/watchlist/${movie.id}`)}
                />
              ))}
            </AnimatedGrid>
          )}
        </>
      )}
    </div>
  );
};

export default List;

