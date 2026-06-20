import api from './api.js';

// Thin wrappers around the API. Each returns the unwrapped `data`.
const get = (url, config) => api.get(url, config).then((r) => r.data);
const post = (url, body) => api.post(url, body).then((r) => r.data);
const put = (url, body) => api.put(url, body).then((r) => r.data);
const del = (url) => api.delete(url).then((r) => r.data);

export const authService = {
  register: (body) => post('/auth/register', body),
  verifyOtp: (body) => post('/auth/verify-otp', body),
  resendOtp: (body) => post('/auth/resend-otp', body),
  login: (body) => post('/auth/login', body),
  forgotPassword: (body) => post('/auth/forgot-password', body),
  resetPassword: (body) => post('/auth/reset-password', body),
  me: () => get('/auth/me'),
};

export const busService = {
  list: () => get('/buses'),
  get: (id) => get(`/buses/${id}`),
  create: (body) => post('/buses', body),
  update: (id, body) => put(`/buses/${id}`, body),
  remove: (id) => del(`/buses/${id}`),
};

export const routeService = {
  list: () => get('/routes'),
  cities: () => get('/routes/cities'),
  create: (body) => post('/routes', body),
  update: (id, body) => put(`/routes/${id}`, body),
  remove: (id) => del(`/routes/${id}`),
};

export const scheduleService = {
  search: (params) => get('/schedules/search', { params }),
  get: (id) => get(`/schedules/${id}`),
  listAll: () => get('/schedules/all'),
  create: (body) => post('/schedules', body),
  update: (id, body) => put(`/schedules/${id}`, body),
  remove: (id) => del(`/schedules/${id}`),
};

export const bookingService = {
  create: (body) => post('/bookings', body),
  my: () => get('/bookings/my'),
  get: (id) => get(`/bookings/${id}`),
  cancel: (id) => put(`/bookings/${id}/cancel`),
  listAll: () => get('/bookings'),
};

export const userService = {
  updateProfile: (body) => put('/users/me', body),
  list: () => get('/users'),
  updateRole: (id, role) => put(`/users/${id}/role`, { role }),
  remove: (id) => del(`/users/${id}`),
};

export const adminService = {
  dashboard: () => get('/admin/dashboard'),
};

export const paymentService = {
  createOrder: (body) => post('/payment/create-order', body),
  verify: (body) => post('/payment/verify', body),
};
