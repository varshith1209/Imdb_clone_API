import { motion } from 'framer-motion';
import RatingStars from './RatingStars.jsx';

const ReviewCard = ({ review }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-lg backdrop-blur-xl"
  >
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={
            review.review_user_avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${review.review_user}`
          }
          alt={review.review_user}
          className="h-12 w-12 rounded-full border border-white/20 object-cover"
          loading="lazy"
        />
        <div>
          <p className="font-semibold text-white">{review.review_user}</p>
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">{review.created_on}</p>
        </div>
      </div>
      <RatingStars value={Number(review.rating)} interactive={false} />
    </div>
    <p className="text-white/80">{review.description}</p>
  </motion.div>
);

export default ReviewCard;

