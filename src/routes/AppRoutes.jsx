import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminRoutes from './AdminRoutes.jsx';

// Auth pages
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import VerifyOtp from '../pages/auth/VerifyOtp.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import GoogleSuccess from '../pages/auth/GoogleSuccess.jsx';

// User pages
import Home from '../pages/user/Home.jsx';
import SearchResults from '../pages/user/SearchResults.jsx';
import BusPage from '../pages/user/BusPage.jsx';
import SeatSelection from '../pages/user/SeatSelection.jsx';
import Checkout from '../pages/user/Checkout.jsx';
import BookingSuccess from '../pages/user/BookingSuccess.jsx';
import MyBookings from '../pages/user/MyBookings.jsx';
import Profile from '../pages/user/Profile.jsx';

// Info pages
import About from '../pages/info/About.jsx';
import Careers from '../pages/info/Careers.jsx';
import Contact from '../pages/info/Contact.jsx';
import HelpCenter from '../pages/info/HelpCenter.jsx';
import Cancellation from '../pages/info/Cancellation.jsx';
import Refunds from '../pages/info/Refunds.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public + user site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />

        {/* Info pages */}
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/bus/:scheduleId" element={<BusPage />} />
        <Route path="/booking/:scheduleId/seats" element={<SeatSelection />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-success/:bookingId"
          element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin — protected, admin-role only */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Google OAuth callback landing */}
      <Route path="/auth/google/success" element={<GoogleSuccess />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
