import { motion } from 'framer-motion';

const AnimatedGrid = ({ children }) => (
  <motion.div
    layout
    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.05,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedGrid;


