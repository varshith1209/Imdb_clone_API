import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader } from '../../components/ui/card.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Button } from '../../components/ui/button.jsx';
import { useAuth } from '../../hooks/useAuth.js';

const Login = () => {
  const { login, authLoading } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      toast.success('Welcome back!');
      const redirect = location.state?.from?.pathname || '/watchlist';
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
      toast.error(err.message || 'Unable to log in.');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="border-white/10 bg-white/10">
          <CardHeader>
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">Portal</p>
              <h2 className="text-3xl font-semibold">Sign in to continue</h2>
              <p className="text-white/60">Access your personalized watchlist dashboard.</p>
            </div>
          </CardHeader>
          <CardContent>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              animate={error ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            >
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={form.username}
                  onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-sm text-red-300">{error}</p>}
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? 'Entering...' : 'Login'}
              </Button>
            </motion.form>
            <p className="mt-6 text-center text-sm text-white/70">
              New here?{' '}
              <Link to="/register" className="text-brand">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;


