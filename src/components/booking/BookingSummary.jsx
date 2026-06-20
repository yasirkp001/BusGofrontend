import { formatCurrency, formatDate } from '../../utils/format.js';

// Trip + fare summary shown alongside seat selection and checkout.
const BookingSummary = ({ schedule, seats = [], children }) => {
  if (!schedule) return null;
  const { bus, route, date, departureTime, arrivalTime, fare } = schedule;
  const subtotal = fare * seats.length;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;

  return (
    <div className="card p-5">
      <h3 className="mb-3 text-base font-semibold text-slate-800">Booking summary</h3>

      <div className="space-y-1 border-b border-slate-100 pb-3">
        <p className="font-medium text-slate-800">{bus?.name}</p>
        <p className="text-sm text-slate-500">{bus?.type}</p>
        <p className="mt-2 text-sm text-slate-600">
          {route?.source} → {route?.destination}
        </p>
        <p className="text-sm text-slate-500">
          {formatDate(date)} • {departureTime} – {arrivalTime}
        </p>
      </div>

      <div className="border-b border-slate-100 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Seats</span>
          <span className="font-medium text-slate-800">
            {seats.length ? seats.join(', ') : '—'}
          </span>
        </div>
      </div>

      <div className="space-y-2 py-3 text-sm">
        <Row label={`Fare (${seats.length} × ${formatCurrency(fare)})`} value={formatCurrency(subtotal)} />
        <Row label="Taxes & fees (5%)" value={formatCurrency(taxes)} />
        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-800">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {children}
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between text-slate-600">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

// Shared helper so pages compute the same total as the summary.
export const computeTotal = (fare, count) => {
  const subtotal = fare * count;
  return subtotal + Math.round(subtotal * 0.05);
};

export default BookingSummary;
