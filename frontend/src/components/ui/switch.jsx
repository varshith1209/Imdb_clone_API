import { cn } from '../../lib/utils.js';

const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    aria-pressed={checked}
    onClick={() => onChange(!checked)}
    className={cn(
      'relative h-7 w-12 rounded-full transition-all',
      checked ? 'bg-brand shadow-glow' : 'bg-white/20',
    )}
  >
    <span
      className={cn(
        'absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition-all',
        checked ? 'right-1' : 'left-1',
      )}
    />
  </button>
);

export { Switch };


