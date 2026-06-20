import { FaStar } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import { formatCurrency, formatDate, formatDuration } from '../../utils/format.js';

// Detailed header for a single trip (used on the bus detail page).
const BusDetails = ({ schedule }) => {
  const { bus, route, date, departureTime, arrivalTime, fare, availableSeats, durationHours } = schedule;

  return (
    <div className="card overflow-hidden">
      <div className="bg-brand-600 px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{bus.name}</h2>
            <p className="text-sm text-brand-100">
              {bus.type} • {bus.busNumber}
            </p>
          </div>
          <span className="badge bg-white/15 text-white">
            <FaStar className="mr-1 text-amber-300" /> {bus.rating}
          </span>
        </div>
      </div>

      <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
        <Detail label="Route" value={`${route.source} → ${route.destination}`} />
        <Detail label="Date" value={formatDate(date)} />
        <Detail label="Departure" value={departureTime} />
        <Detail label="Arrival" value={arrivalTime} />
        <Detail label="Duration" value={formatDuration(durationHours)} />
        <Detail label="Distance" value={`${route.distanceKm} km`} />
        <Detail
          label="Seats available"
          value={
            <span className="flex items-center gap-1">
              <MdEventSeat /> {availableSeats} / {bus.totalSeats}
            </span>
          }
        />
        <Detail label="Fare / seat" value={<span className="font-bold text-brand-600">{formatCurrency(fare)}</span>} />
      </div>

      <div className="border-t border-slate-100 px-6 py-4">
        <p className="mb-2 text-sm font-semibold text-slate-700">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {bus.amenities?.map((a) => (
            <span key={a} className="badge bg-slate-100 text-slate-600">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
  </div>
);

export default BusDetails;
