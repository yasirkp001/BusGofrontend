import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import { io } from 'socket.io-client';
import { scheduleService } from '../../services/index.js';
import { setSchedule, toggleSeat, selectBooking } from '../../redux/slices/bookingSlice.js';
import { selectIsAuthenticated } from '../../redux/slices/authSlice.js';
import SeatLayout from '../../components/bus/SeatLayout.jsx';
import BookingSummary from '../../components/booking/BookingSummary.jsx';
import Loader from '../../components/common/Loader.jsx';
import Button from '../../components/common/Button.jsx';

const MAX_SEATS = 6;

const SeatSelection = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector(selectBooking);
  const isAuth = useSelector(selectIsAuthenticated);

  const [schedule, setLocalSchedule] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scheduleService
      .get(scheduleId)
      .then((d) => {
        setLocalSchedule(d.schedule);
        setBookedSeats(d.schedule.bookedSeats || []);
        if (booking.schedule?.id !== d.schedule.id) dispatch(setSchedule(d.schedule));
      })
      .catch(() => {
        setLocalSchedule(null);
        toast.error('Could not load trip details. Please try again.');
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId]);

  // Real-time: update booked seats when another user books the same schedule
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || window.location.origin, {
      path: '/socket.io',
    });
    socket.on('booking:new', (newBooking) => {
      if (String(newBooking.scheduleId) === scheduleId || newBooking.schedule?.id === scheduleId) {
        setBookedSeats((prev) => [...new Set([...prev, ...(newBooking.seats || [])])]);
      }
    });
    socket.on('booking:cancelled', (cancelled) => {
      if (String(cancelled.scheduleId) === scheduleId || cancelled.schedule?.id === scheduleId) {
        setBookedSeats((prev) => prev.filter((s) => !(cancelled.seats || []).includes(s)));
      }
    });
    return () => socket.disconnect();
  }, [scheduleId]);

  const selectedSeats = booking.selectedSeats;

  const proceed = () => {
    if (!selectedSeats.length) return toast.error('Please select at least one seat');
    if (!isAuth) {
      toast.error('Please log in to continue your booking.');
      return navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
    navigate('/checkout');
  };

  if (loading) return <Loader fullScreen label="Loading seat map…" />;
  if (!schedule) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-slate-600">Trip not found.</p>
        <Link to="/search" className="btn-secondary mt-4 inline-flex">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="btn-ghost mb-4 !px-2">
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-xl font-bold text-slate-800">
        {schedule.route?.source ?? '—'} → {schedule.route?.destination ?? '—'}
      </h1>
      <p className="text-sm text-slate-500">
        {schedule.bus?.name ?? 'Unknown bus'} • {schedule.bus?.type ?? ''}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-800">Select your seats</h2>
          <SeatLayout
            totalSeats={schedule.totalSeats}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onToggle={(seat) => dispatch(toggleSeat(seat))}
            onMaxReached={() => toast.error(`You can select up to ${MAX_SEATS} seats.`)}
            maxSeats={MAX_SEATS}
          />
          <p className="mt-4 text-center text-xs text-slate-400">You can select up to {MAX_SEATS} seats.</p>
        </div>

        <div className="space-y-4">
          <BookingSummary schedule={schedule} seats={selectedSeats}>
            <Button onClick={proceed} disabled={!selectedSeats.length} className="mt-4 w-full">
              Proceed to checkout
            </Button>
          </BookingSummary>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
