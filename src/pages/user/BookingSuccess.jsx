import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { bookingService } from '../../services/index.js';
import TicketCard from '../../components/booking/TicketCard.jsx';
import Loader from '../../components/common/Loader.jsx';

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const loadBooking = () => {
    setLoading(true);
    setFetchError(false);
    bookingService
      .get(bookingId)
      .then((d) => setBooking(d.booking))
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  };

  useEffect(loadBooking, [bookingId]);

  if (loading) return <Loader fullScreen label="Fetching your ticket…" />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
          <FiCheckCircle size={36} />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-800">Booking confirmed!</h1>
        <p className="mt-1 text-slate-500">Your seats are reserved. Have a great trip.</p>
      </div>

      {booking ? (
        <TicketCard booking={booking} />
      ) : fetchError ? (
        <div className="card p-8 text-center">
          <p className="text-slate-600">Unable to load your ticket details.</p>
          <p className="mt-1 text-sm text-slate-400">Your booking was confirmed — it will appear in My Bookings shortly.</p>
          <button onClick={loadBooking} className="btn-secondary mt-4 inline-flex items-center gap-1.5">
            <FiRefreshCw size={14} /> Try again
          </button>
        </div>
      ) : null}

      <div className="mt-6 flex justify-center gap-3">
        <Link to="/my-bookings" className="btn-primary">
          View my bookings
        </Link>
        <Link to="/search" className="btn-secondary">
          Book another trip
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;
