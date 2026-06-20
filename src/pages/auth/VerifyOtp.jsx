import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { authService } from '../../services/index.js';
import { setCredentials } from '../../redux/slices/authSlice.js';
import Button from '../../components/common/Button.jsx';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState(location.state?.devOtp || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state?.email) {
      // came here directly without context
      toast('Enter the email you registered with.');
    }
  }, [location.state]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.verifyOtp({ email, otp });
      dispatch(setCredentials({ token: data.token, user: data.user }));
      toast.success('Account verified!');
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      const data = await authService.resendOtp({ email, purpose: 'verify' });
      setDevOtp(data.devOtp || '');
      toast.success('A new OTP has been sent.');
    } catch (err) {
      toast.error(err.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-800">Verify your account</h2>
      <p className="mt-1 text-sm text-slate-500">Enter the 6-digit code we sent to your email.</p>

      {devOtp && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Demo OTP (no email service): <span className="font-bold tracking-widest">{devOtp}</span>
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="label">Email</label>
          <input type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
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
        <Button type="submit" loading={loading} className="w-full">
          Verify
        </Button>
      </form>

      <div className="mt-5 flex items-center justify-between text-sm">
        <button onClick={resend} className="font-medium text-brand-600 hover:underline">
          Resend OTP
        </button>
        <Link to="/login" className="text-slate-500 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default VerifyOtp;
