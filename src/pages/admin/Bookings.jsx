import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiXCircle, FiBookmark, FiArrowRight } from 'react-icons/fi';
import { bookingService } from '../../services/index.js';
import EmptyState from '../../components/common/EmptyState.jsx';
import { TableSkeleton } from '../../components/common/Skeleton.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import { formatCurrency, formatDate } from '../../utils/format.js';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = () => {
    setLoading(true);
    bookingService.listAll().then((d) => setBookings(d.bookings)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const cancel = async (b) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      const data = await bookingService.cancel(b.id);
      setBookings((prev) => prev.map((x) => (x.id === b.id ? { ...x, ...data.booking } : x)));
      toast.success('Booking cancelled');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };
  const shown = bookings.filter((b) => (filter === 'all' ? true : b.status === filter));

  const filterPills = (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
      {['all', 'confirmed', 'cancelled'].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
            filter === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {f} <span className="text-xs text-slate-400">{counts[f]}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <PageHeader title="Bookings" subtitle="All customer bookings." action={!loading && filterPills} />

      {loading ? (
        <TableSkeleton cols={7} rows={7} />
      ) : shown.length === 0 ? (
        <EmptyState icon={FiBookmark} title="No bookings to show" subtitle={filter === 'all' ? 'Bookings will appear here once customers reserve seats.' : `No ${filter} bookings.`} />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="admin-th">Booking</th>
                  <th className="admin-th">Customer</th>
                  <th className="admin-th">Trip</th>
                  <th className="admin-th">Date</th>
                  <th className="admin-th">Seats</th>
                  <th className="admin-th">Amount</th>
                  <th className="admin-th">Status</th>
                  <th className="admin-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shown.map((b) => (
                  <tr key={b.id} className="transition-colors hover:bg-slate-50">
                    <td className="admin-td font-mono text-xs text-slate-400">{b.id?.slice(0, 8)?.toUpperCase() ?? '—'}</td>
                    <td className="admin-td">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                          {(b.user?.name || 'G').charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-medium text-slate-800">{b.user?.name || 'Guest'}</p>
                          <p className="text-xs text-slate-400">{b.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="admin-td">
                      <span className="flex items-center gap-1.5">{b.source} <FiArrowRight className="text-slate-300" size={13} /> {b.destination}</span>
                    </td>
                    <td className="admin-td">{formatDate(b.journeyDate)}</td>
                    <td className="admin-td">{b.seats?.join(', ')}</td>
                    <td className="admin-td font-medium text-slate-700">{formatCurrency(b.totalAmount)}</td>
                    <td className="admin-td"><StatusBadge status={b.status} /></td>
                    <td className="admin-td">
                      <div className="flex justify-end">
                        {b.status === 'confirmed' && (
                          <button onClick={() => cancel(b)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                            <FiXCircle size={14} /> Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
