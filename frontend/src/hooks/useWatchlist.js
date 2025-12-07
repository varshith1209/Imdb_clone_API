import { useMemo } from 'react';
import {
  usePlatformsQuery,
  useMoviesQuery,
  useWatchlistItemQuery,
  useUserWatchlistQuery,
} from '../api/watchlist.js';
import { useAuth } from './useAuth.js';

export const useWatchlist = () => {
  const { data: movies = [], isLoading: moviesLoading, error: moviesError } = useMoviesQuery();
  const { data: platforms = [] } = usePlatformsQuery();
  const { isAuthenticated } = useAuth();
  const {
    data: myWatchlist = [],
    isLoading: myWatchlistLoading,
    error: myWatchlistError,
  } = useUserWatchlistQuery({ enabled: isAuthenticated });

  const platformMap = useMemo(() => {
    const map = new Map();
    platforms.forEach((platform) => {
      map.set(platform.id, platform);
    });
    return map;
  }, [platforms]);

  const myWatchlistMap = useMemo(() => {
    const map = new Map();
    myWatchlist.forEach((entry) => {
      map.set(entry.movie.id, entry.id);
    });
    return map;
  }, [myWatchlist]);

  return {
    movies,
    moviesLoading,
    moviesError,
    platforms,
    platformMap,
    myWatchlist,
    myWatchlistLoading,
    myWatchlistError,
    myWatchlistMap,
  };
};

export const useWatchlistItem = (id) => useWatchlistItemQuery(id);

