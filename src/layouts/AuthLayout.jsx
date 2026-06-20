import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaBus } from 'react-icons/fa';

const AuthLayout = () => {
  const location = useLocation();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden flex-col justify-between bg-brand-600 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
            <FaBus />
          </span>
          BusGo
        </Link>
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Travel smarter.<br />Book your seat in seconds.
          </h1>
          <p className="mt-4 max-w-md text-white/75">
            Compare operators, pick your seats, and manage all your bookings in one place.
          </p>
        </div>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} BusGo</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-xl font-extrabold text-slate-800 lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white">
              <FaBus />
            </span>
            BusGo
          </Link>
          <div key={location.pathname} className="animate-fade-up">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
