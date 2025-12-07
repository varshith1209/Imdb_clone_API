import { BookmarkPlus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useWatchlist } from '../../hooks/useWatchlist.js';
import { useAddToWatchlistMutation, useRemoveFromWatchlistMutation } from '../../api/watchlist.js';

const AddToWatchlistButton = ({ movieId, size = 'default', variant = 'default', className = '' }) => {
  if (!movieId) return null;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { myWatchlistMap } = useWatchlist();
  const addMutation = useAddToWatchlistMutation();
  const removeMutation = useRemoveFromWatchlistMutation();

  const entryId = myWatchlistMap.get(movieId);
  const isSaved = Boolean(entryId);
  const isLoading = addMutation.isPending || removeMutation.isPending;

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.info('Sign in to build your watchlist.');
      navigate('/login');
      return;
    }
    if (isSaved) {
      removeMutation.mutate(entryId, {
        onSuccess: () => toast.success('Removed from your watchlist.'),
        onError: (error) => toast.error(error.message),
      });
    } else {
      addMutation.mutate(movieId, {
        onSuccess: () => toast.success('Added to your watchlist.'),
        onError: (error) => toast.error(error.message),
      });
    }
  };

  return (
    <Button
      type="button"
      variant={isSaved ? 'secondary' : variant}
      size={size}
      className={className}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isSaved ? <Check className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
      {isSaved ? 'In Watchlist' : 'Add to Watchlist'}
    </Button>
  );
};

export default AddToWatchlistButton;

