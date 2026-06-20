import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setCredentials } from '../../redux/slices/authSlice.js';
import { authService } from '../../services/index.js';
import Loader from '../../components/common/Loader.jsx';

/**
 * Landing page after Google OAuth redirect.
 * URL: /auth/google/success?token=...&name=...&role=...
 * Stores the token, fetches the full user profile, then redirects home.
 */
const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    const role  = params.get('role');
    const name  = params.get('name');

    if (!token) {
      toast.error('Google login failed. Please try again.');
      navigate('/login', { replace: true });
      return;
    }

    // Temporarily store token so the /auth/me call is authenticated
    localStorage.setItem('bb_token', token);

    authService.me()
      .then(({ user }) => {
        dispatch(setCredentials({ token, user }));
        toast.success(`Welcome, ${user.name.split(' ')[0]}!`);
        navigate(role === 'admin' ? '/admin' : '/', { replace: true });
      })
      .catch(() => {
        // Fallback: build a minimal user from URL params
        const user = { name: decodeURIComponent(name || ''), role, email: '' };
        dispatch(setCredentials({ token, user }));
        toast.success(`Welcome${name ? `, ${decodeURIComponent(name).split(' ')[0]}` : ''}!`);
        navigate(role === 'admin' ? '/admin' : '/', { replace: true });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader fullScreen label="Signing you in…" />;
};

export default GoogleSuccess;
