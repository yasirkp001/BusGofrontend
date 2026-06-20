import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import Buses from '../pages/admin/Buses.jsx';
import AdminRoutesPage from '../pages/admin/Routes.jsx';
import Schedules from '../pages/admin/Schedules.jsx';
import Bookings from '../pages/admin/Bookings.jsx';
import Users from '../pages/admin/Users.jsx';

// Nested admin routes, rendered under /admin/* inside the AdminLayout.
const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="buses" element={<Buses />} />
        <Route path="routes" element={<AdminRoutesPage />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
