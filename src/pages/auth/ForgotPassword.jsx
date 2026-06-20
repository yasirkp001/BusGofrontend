import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../services/index.js';
import Button from '../../components/common/Button.jsx';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: request, 2: reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.forgotPassword({ email });
      setDevOtp(data.devOtp || '');
      toast.success('If that account exists, an OTP has been sent.');
      setStep(2);
    } catch (err) {
      toast.error(err.message || 'Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  const reset = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword({ email, otp, password });
      toast.success('Password reset! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-800">Reset password</h2>
      <p className="mt-1 text-sm text-slate-500">
        {step === 1 ? 'Enter your email to receive a reset code.' : 'Enter the code and your new password.'}
      </p>

      {devOtp && step === 2 && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Demo OTP: <span className="font-bold tracking-widest">{devOtp}</span>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={requestOtp} className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input type="email" required className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Send reset code
          </Button>
        </form>
      ) : (
        <form onSubmit={reset} className="mt-6 space-y-4">
          <div>
            <label className="label">OTP</label>
            <input
              required
              inputMode="numeric"
              maxLength={6}
              className="input text-center text-lg tracking-[0.5em]"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          <div>
            <label className="label">New password</label>
            <input type="password" required className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Reset password
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link to="/login" className="font-semibold text-brand-600 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
