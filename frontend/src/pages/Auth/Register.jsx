import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader } from '../../components/ui/card.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Button } from '../../components/ui/button.jsx';
import { useRegisterMutation } from '../../api/auth.js';

const Register = () => {
  const navigate = useNavigate();
  const mutation = useRegisterMutation();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    profile_picture: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      toast.error('Passwords must match.');
      return;
    }
    try {
      await mutation.mutateAsync(form);
      toast.success('Account created. Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <Card className="border-white/10 bg-white/10">
          <CardHeader>
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">Create Access</p>
              <h2 className="text-3xl font-semibold">Design your cineverse.</h2>
              <p className="text-white/60">Sign up to sync reviews, ratings, and custom lists.</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile_picture">Profile picture URL</Label>
                <Input
                  id="profile_picture"
                  type="url"
                  placeholder="https://"
                  value={form.profile_picture}
                  onChange={(e) => setForm((prev) => ({ ...prev, profile_picture: e.target.value }))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={form.confirm_password}
                    onChange={(e) => setForm((prev) => ({ ...prev, confirm_password: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create account'}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-white/70">
              Already onboard?{' '}
              <Link to="/login" className="text-brand">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;

