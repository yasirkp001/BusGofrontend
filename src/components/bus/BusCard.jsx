import { Link } from 'react-router-dom';
import { FaStar, FaWifi } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import { formatCurrency, formatDuration } from '../../utils/format.js';

const BusCard = ({ schedule }) => {
  const { bus, route, departureTime, arrivalTime, fare, availableSeats, durationHours } = schedule;

  return (
    <div className="card hover-lift p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Operator */}
        <div className="min-w-[180px]">
          <h3 className="font-semibold text-slate-800">{bus.name}</h3>
          <p className="text-sm text-slate-500">{bus.type}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="badge bg-green-50 text-green-700">
              <FaStar className="mr-1 text-amber-400" /> {bus.rating}
            </span>
            {bus.amenities?.includes('WiFi') && (
              <span className="badge bg-slate-100 text-slate-500">
                <FaWifi className="mr-1" /> WiFi
              </span>
            )}
          </div>
        </div>

        {/* Timing */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">{departureTime}</p>
            <p className="text-xs text-slate-500">{route.source}</p>
          </div>
          <div className="flex flex-col items-center text-xs text-slate-400">
            <span>{formatDuration(durationHours)}</span>
            <span className="my-1 h-px w-16 bg-slate-200" />
            <span>Direct</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">{arrivalTime}</p>
            <p className="text-xs text-slate-500">{route.destination}</p>
          </div>
        </div>

        {/* Fare + CTA */}
        <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
          <div className="text-right">
            <p className="text-xl font-extrabold text-slate-800">{formatCurrency(fare)}</p>
            <p className="flex items-center justify-end gap-1 text-xs text-slate-500">
              <MdEventSeat /> {availableSeats} seats left
            </p>
          </div>
          <Link
            to={`/booking/${schedule.id}/seats`}
            className={`btn-primary !py-2 ${availableSeats === 0 ? 'pointer-events-none opacity-50' : ''}`}
          >
            {availableSeats === 0 ? 'Sold out' : 'Select Seats'}
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
        {bus.amenities?.map((a) => (
          <span key={a} className="text-xs text-slate-400">
            • {a}
          </span>
        ))}
        <Link to={`/bus/${schedule.id}`} className="ml-auto text-xs font-medium text-brand-600 hover:underline">
          View details →
        </Link>
      </div>
    </div>
  );
};

export default BusCard;
