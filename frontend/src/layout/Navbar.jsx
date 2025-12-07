import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, User } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { Switch } from '../components/ui/switch.jsx';
import { useAuth } from '../hooks/useAuth.js';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Watchlist', to: '/watchlist' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Flame className="h-6 w-6 text-brand" />
          <span>MovieBox</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="text-sm uppercase tracking-[0.4em] text-white/60 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60">
            <span>Dark</span>
            <Switch checked={theme === 'dark'} onChange={(value) => setTheme(value ? 'dark' : 'light')} />
            <span>Light</span>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
              <User className="h-4 w-4" />
              <span>{user?.username || 'Guest'}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/login')}>Sign in</Button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-4 border-t border-white/10 px-6 pb-6 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-[0.4em] text-white/70"
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={() => (isAuthenticated ? handleSignOut() : navigate('/login'))}>
              {isAuthenticated ? 'Sign out' : 'Sign in'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


