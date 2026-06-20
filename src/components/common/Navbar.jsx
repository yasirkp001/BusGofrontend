import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBus } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { logout, selectUser } from '../../redux/slices/authSlice.js';

const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/');
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Search Buses' },
    ...(user ? [{ to: '/my-bookings', label: 'My Bookings' }] : []),
  ];

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-800">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white">
            <FaBus />
          </span>
          Bus<span className="text-brand-500">Go</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/profile" className="btn-ghost !py-2">
                <FiUser /> {user.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="btn-secondary !py-2">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost !py-2">
                Login
              </Link>
              <Link to="/register" className="btn-primary !py-2">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button className="rounded-lg p-2 text-slate-600 md:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </NavLink>
            ))}
            <div className="my-2 h-px bg-slate-100" />
            {user ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Profile
                </Link>
                <button onClick={handleLogout} className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
