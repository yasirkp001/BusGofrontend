import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { bookingService } from '../../services/index.js';
import TicketCard from '../../components/booking/TicketCard.jsx';
import Loader from '../../components/common/Loader.jsx';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const load = () => {
    setLoading(true);
    bookingService
      .my()
      .then((d) => setBookings(d.bookings))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const cancel = async (booking) => {
    if (!window.confirm('Cancel this booking? Seats will be released.')) return;
    setCancellingId(booking.id);
    try {
      const data = await bookingService.cancel(booking.id);
      setBookings((prev) => prev.map((b) => (b.id === booking.id ? data.booking : b)));
      toast.success('Booking cancelled');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <Loader fullScreen label="Loading your bookings…" />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-xl font-bold text-slate-800">My bookings</h1>
      <p className="text-sm text-slate-500">Manage and review your trips.</p>

      {bookings.length === 0 ? (
        <div className="card mt-6 p-10 text-center">
          <p className="text-slate-600">You have no bookings yet.</p>
          <Link to="/search" className="btn-primary mt-4 inline-flex">
            Book a trip
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {bookings.map((b) => (
            <TicketCard key={b.id} booking={b} onCancel={cancel} cancelling={cancellingId === b.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
