import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="px-6 lg:px-12 pb-12">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={location.key}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="mx-auto max-w-6xl min-h-[70vh]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AppLayout;

