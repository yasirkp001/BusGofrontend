import axios from 'axios';
import { store } from '../redux/store.js';
import { logout } from '../redux/slices/authSlice.js';

// Same-origin in dev thanks to the Vite proxy; override with VITE_API_URL in prod.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach the JWT (if any) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bb_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize errors to a plain message string consumers can surface directly.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
    const status = error.response?.status;
    const responseData = error.response?.data;

    // Auto-logout on auth failure (except on the auth calls themselves).
    if (status === 401 && !error.config?.url?.includes('/auth/')) {
      store.dispatch(logout());
    }

    // Build a plain, serialisable rejection so every catch block can safely
    // read .message, .status, and .data without worrying about AxiosError
    // internals (which are non-enumerable and lost when spread with {...}).
    const normalised = new Error(message);
    normalised.status = status;
    normalised.data   = responseData;
    return Promise.reject(normalised);
  }
);

export default api;
