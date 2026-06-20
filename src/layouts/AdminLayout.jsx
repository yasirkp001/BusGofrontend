import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBus } from 'react-icons/fa';
import {
  FiGrid,
  FiTruck,
  FiMap,
  FiCalendar,
  FiBookmark,
  FiUsers,
  FiLogOut,
  FiExternalLink,
  FiBell,
} from 'react-icons/fi';
import { IoMenu, IoClose } from 'react-icons/io5';
import { logout, selectUser } from '../redux/slices/authSlice.js';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ to: '/admin', label: 'Dashboard', icon: FiGrid, end: true }],
  },
  {
    label: 'Manage',
    items: [
      { to: '/admin/buses', label: 'Buses', icon: FiTruck },
      { to: '/admin/routes', label: 'Routes', icon: FiMap },
      { to: '/admin/schedules', label: 'Schedules', icon: FiCalendar },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/bookings', label: 'Bookings', icon: FiBookmark },
      { to: '/admin/users', label: 'Users', icon: FiUsers },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

const linkClass = ({ isActive }) =>
  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
    isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
  }`;

// Extracted at module scope so React never sees a new component type on re-renders.
const SidebarContent = ({ user, onClose, onLogout }) => (
  <div className="flex h-full flex-col">
    <Link to="/admin" className="flex items-center gap-2.5 px-2 py-1" onClick={onClose}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-pop">
        <FaBus />
      </span>
      <div className="leading-tight">
        <p className="text-lg font-extrabold text-white">
          Bus<span className="text-brand-400">Go</span>
        </p>
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Admin Console</p>
      </div>
    </Link>

    <nav className="mt-7 flex-1 space-y-6 overflow-y-auto">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            {group.label}
          </p>
          <div className="space-y-1">
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass} onClick={onClose}>
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-400 transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <Icon size={18} className={isActive ? 'text-brand-300' : ''} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>

    <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
      <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-semibold text-white">
          {user?.name?.charAt(0)?.toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{user?.name}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to="/"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10"
        >
          <FiExternalLink size={15} /> Site
        </Link>
        <button
          onClick={onLogout}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-500/20"
        >
          <FiLogOut size={15} /> Logout
        </button>
      </div>
    </div>
  </div>
);

const AdminLayout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const closeMobile = () => setOpen(false);

  const current =
    [...ALL_ITEMS].sort((a, b) => b.to.length - a.to.length).find((i) =>
      i.end ? location.pathname === i.to : location.pathname.startsWith(i.to)
    ) || ALL_ITEMS[0];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-slate-900 p-4 lg:flex">
        <SidebarContent user={user} onClose={closeMobile} onLogout={handleLogout} />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeMobile} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-slate-900 p-4">
            <button className="absolute right-3 top-3 text-slate-400 hover:text-white" onClick={closeMobile}>
              <IoClose size={22} />
            </button>
            <SidebarContent user={user} onClose={closeMobile} onLogout={handleLogout} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button className="icon-btn lg:hidden" onClick={() => setOpen(true)}>
              <IoMenu size={22} />
            </button>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Admin</p>
              <h1 className="text-base font-bold leading-tight text-slate-800">{current.label}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-btn relative" title="Notifications">
              <FiBell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
            </button>
            <div className="ml-1 flex items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-semibold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
              <span className="hidden text-sm font-medium text-slate-700 sm:inline">
                {user?.name?.split(' ')[0]}
              </span>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
