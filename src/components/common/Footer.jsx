import { Link } from 'react-router-dom';
import { FaBus } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-800">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">
                <FaBus size={14} />
              </span>
              Bus<span className="text-brand-500">Go</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Book intercity bus tickets across India. Comfortable rides, transparent prices.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/about" className="transition-colors hover:text-brand-600">About us</Link></li>
              <li><Link to="/careers" className="transition-colors hover:text-brand-600">Careers</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-brand-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/help" className="transition-colors hover:text-brand-600">Help Center</Link></li>
              <li><Link to="/cancellation" className="transition-colors hover:text-brand-600">Cancellation</Link></li>
              <li><Link to="/refunds" className="transition-colors hover:text-brand-600">Refunds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Demo accounts</h4>
            <ul className="space-y-1 text-sm text-slate-500">
              <li>admin@demo.com / Admin@123</li>
              <li>user@demo.com / User@123</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} BusGo. Built as a full-stack demo.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
