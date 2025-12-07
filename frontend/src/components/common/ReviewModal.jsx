import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '../ui/button.jsx';
import { Input } from '../ui/input.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog.jsx';
import RatingStars from './RatingStars.jsx';
import { useCreateReview } from '../../hooks/useReviews.js';

const ReviewModal = ({ watchlistId, open, onOpenChange }) => {
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const mutation = useCreateReview(watchlistId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({
        rating,
        description: `${headline} — ${body}`,
      });
      toast.success('Review added!');
      setHeadline('');
      setBody('');
      setRating(5);
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message || 'Unable to submit review.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your thoughts</DialogTitle>
          <DialogDescription>Compose a quick review. Your rating shapes the community score.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Rating</p>
            <RatingStars value={rating} interactive onChange={setRating} />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
            <Textarea
              placeholder="Tell us what stood out..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Sending...' : 'Publish review'}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;


