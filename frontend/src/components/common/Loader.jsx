import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex flex-col items-center gap-4 py-16 text-center">
    <motion.div
      className="h-16 w-16 rounded-full border-4 border-white/20 border-t-brand"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
    />
    <p className="text-sm uppercase tracking-[0.5em] text-white/60">Loading</p>
  </div>
);

export default Loader;


