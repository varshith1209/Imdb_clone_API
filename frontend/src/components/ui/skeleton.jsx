import { cn } from '../../lib/utils.js';

const Skeleton = ({ className, ...props }) => (
  <div className={cn('animate-pulse rounded-2xl bg-white/10', className)} {...props} />
);

export { Skeleton };


