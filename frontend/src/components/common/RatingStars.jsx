import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils.js';

const RatingStars = ({ value = 0, outOf = 5, interactive = false, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: outOf }).map((_, index) => {
        const active = index < value;
        return (
          <motion.button
            key={index}
            type={interactive ? 'button' : 'submit'}
            whileHover={{ scale: interactive ? 1.15 : 1 }}
            whileTap={{ scale: interactive ? 0.95 : 1 }}
            onClick={interactive ? () => onChange(index + 1) : undefined}
            className={cn('text-white/30', interactive && 'cursor-pointer')}
          >
            <Star className={cn('h-5 w-5 transition-colors', active && 'fill-brand text-brand')} />
          </motion.button>
        );
      })}
      <span className="ml-2 text-sm font-semibold text-white/70">{value.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;


