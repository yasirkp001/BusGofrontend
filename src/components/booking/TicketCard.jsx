import { FaBus } from 'react-icons/fa';
import { formatCurrency, formatDate } from '../../utils/format.js';
import Button from '../common/Button.jsx';

const STATUS_STYLES = {
  confirmed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
};

// Displays a booking as a ticket. Optionally renders a cancel action.
const TicketCard = ({ booking, onCancel, cancelling = false }) => {
  const schedule = booking.schedule;
  const bus = schedule?.bus;
  const route = schedule?.route;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-dashed border-slate-200 px-5 py-3">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-500 text-white">
            <FaBus size={12} />
          </span>
          {bus?.name || 'Trip'}
        </div>
        <span className={`badge capitalize ${STATUS_STYLES[booking.status] || 'bg-slate-100 text-slate-600'}`}>
          {booking.status}
        </span>
      </div>

      <div className="grid gap-4 px-5 py-4 sm:grid-cols-4">
        <Field label="From" value={booking.source || route?.source} />
        <Field label="To" value={booking.destination || route?.destination} />
        <Field label="Journey date" value={formatDate(booking.journeyDate)} />
        <Field label="Departure" value={schedule?.departureTime || '—'} />
        <Field label="Seats" value={booking.seats?.join(', ')} />
        <Field label="Passengers" value={booking.passengers?.length || booking.seats?.length} />
        <Field label="Booking ID" value={booking.id?.slice(0, 8)?.toUpperCase() ?? '—'} />
        <Field label="Amount" value={<span className="font-bold text-slate-800">{formatCurrency(booking.totalAmount)}</span>} />
      </div>

      {booking.passengers?.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-3">
          <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">Passengers</p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-600">
            {booking.passengers.map((p, i) => (
              <span key={i} className="rounded-md bg-slate-50 px-2 py-1">
                {p.name || 'Guest'} · Seat {p.seat}
              </span>
            ))}
          </div>
        </div>
      )}

      {onCancel && booking.status === 'confirmed' && (
        <div className="flex justify-end border-t border-slate-100 px-5 py-3">
          <Button variant="danger" className="!py-2" loading={cancelling} onClick={() => onCancel(booking)}>
            Cancel booking
          </Button>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-0.5 text-sm font-medium text-slate-800">{value || '—'}</p>
  </div>
);

export default TicketCard;
