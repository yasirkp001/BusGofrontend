import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { authService } from '../../services/index.js';
import { setCredentials } from '../../redux/slices/authSlice.js';
import Button from '../../components/common/Button.jsx';

const GOOGLE_AUTH_URL = `${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}/api/auth/google`;

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login(form);
      dispatch(setCredentials({ token: data.token, user: data.user }));
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
      navigate(data.user.role === 'admin' ? '/admin' : redirectTo, { replace: true });
    } catch (err) {
      // 403 means the account exists but isn't verified yet
      if (err.status === 403 && err.data?.needsVerification) {
        toast('Please verify your account first.');
        navigate('/verify-otp', {
          state: { email: err.data.email, devOtp: err.data.devOtp, from: location.state?.from },
        });
        return;
      }
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    setForm(
      role === 'admin'
        ? { email: 'admin@demo.com', password: 'Admin@123' }
        : { email: 'user@demo.com', password: 'User@123' }
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-800">Welcome back</h2>
      <p className="mt-1 text-sm text-slate-500">Log in to manage your bookings.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" placeholder="you@example.com" value={form.email} onChange={onChange} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="label">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-brand-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input name="password" type="password" required className="input" placeholder="••••••••" value={form.password} onChange={onChange} />
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Log in
        </Button>
      </form>

      {/* Google OAuth */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs text-slate-400">
          <span className="bg-white px-2">or continue with</span>
        </div>
      </div>

      <a
        href={GOOGLE_AUTH_URL}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
      >
        <FcGoogle size={20} />
        Continue with Google
      </a>

      <div className="mt-4 rounded-lg bg-slate-100 p-3 text-xs text-slate-500">
        <p className="mb-2 font-medium text-slate-600">Demo accounts</p>
        <div className="flex gap-2">
          <button onClick={() => fillDemo('user')} className="rounded-md bg-white px-2.5 py-1 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
            User
          </button>
          <button onClick={() => fillDemo('admin')} className="rounded-md bg-white px-2.5 py-1 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
            Admin
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
