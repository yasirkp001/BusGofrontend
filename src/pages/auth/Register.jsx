import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { authService } from '../../services/index.js';
import Button from '../../components/common/Button.jsx';

const GOOGLE_AUTH_URL = `${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}/api/auth/google`;

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    try {
      const data = await authService.register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      toast.success('Account created! Verify the OTP to continue.');
      navigate('/verify-otp', { state: { email: data.email, devOtp: data.devOtp } });
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-800">Create your account</h2>
      <p className="mt-1 text-sm text-slate-500">Join BusGo and start booking in minutes.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="label">Full name</label>
          <input name="name" required className="input" placeholder="Your name" value={form.name} onChange={onChange} />
        </div>
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" placeholder="you@example.com" value={form.email} onChange={onChange} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input name="phone" className="input" placeholder="10-digit mobile" value={form.phone} onChange={onChange} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Password</label>
            <input name="password" type="password" required className="input" placeholder="••••••••" value={form.password} onChange={onChange} />
          </div>
          <div>
            <label className="label">Confirm</label>
            <input name="confirm" type="password" required className="input" placeholder="••••••••" value={form.confirm} onChange={onChange} />
          </div>
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Create account
        </Button>
      </form>

      {/* Google OAuth */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs text-slate-400">
          <span className="bg-white px-2">or sign up with</span>
        </div>
      </div>

      <a
        href={GOOGLE_AUTH_URL}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
      >
        <FcGoogle size={20} />
        Continue with Google
      </a>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
