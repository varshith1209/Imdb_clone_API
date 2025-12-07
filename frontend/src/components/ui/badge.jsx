import { cn } from '../../lib/utils.js';

const Badge = ({ className, children }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white',
      className,
    )}
  >
    {children}
  </span>
);

export { Badge };


