import { cn } from '../../lib/utils.js';

const colors = ['from-pink-500/20 to-orange-500/20', 'from-cyan-500/20 to-blue-500/20', 'from-amber-400/20 to-red-400/20'];

const PlatformBadge = ({ name, url, index = 0 }) => {
  const gradient = colors[index % colors.length];
  return (
    <a
      href={url?.startsWith('http') ? url : `https://${url}`}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-r px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/90 transition hover:scale-105',
        gradient,
      )}
    >
      <span className="h-2 w-2 rounded-full bg-white" />
      {name}
    </a>
  );
};

export default PlatformBadge;


