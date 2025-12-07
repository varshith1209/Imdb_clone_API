import { motion } from 'framer-motion';

const HeroCard = ({ title, description, badge = 'Curated Cinema', meta, highlightImage, actions }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="relative overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.5)]"
  >
    <div className="absolute inset-0 bg-hero-gradient opacity-70" />
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1 space-y-6">
        <div className="inline-flex w-fit items-center rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
          {badge}
        </div>
        <div>
          <motion.h1
            className="text-4xl font-semibold leading-tight md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-3 max-w-3xl text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
          {meta && <p className="mt-4 text-sm uppercase tracking-[0.4em] text-white/50">{meta}</p>}
        </div>
        {actions}
      </div>
      {highlightImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 w-full flex-1 lg:mt-0"
        >
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl">
            <img
              src={highlightImage}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}
    </div>
  </motion.div>
);

export default HeroCard;

