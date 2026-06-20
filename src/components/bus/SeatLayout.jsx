import { FaCouch } from 'react-icons/fa';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';

const SEAT_CLASS = {
  booked: 'cursor-not-allowed bg-slate-200 text-slate-400',
  selected: 'bg-brand-500 text-white shadow',
  available: 'bg-white text-slate-600 hover:border-brand-400 hover:text-brand-600',
};

const Seat = ({ seat, state, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={state === 'booked'}
    title={state === 'booked' ? `Seat ${seat} • booked` : `Seat ${seat}`}
    className={`flex h-10 w-10 flex-col items-center justify-center rounded-md border border-slate-300 text-xs font-semibold transition-colors ${SEAT_CLASS[state]}`}
  >
    <MdAirlineSeatReclineNormal className="text-sm" />
    {seat}
  </button>
);

const SeatLayout = ({ totalSeats = 0, bookedSeats = [], selectedSeats = [], onToggle, onMaxReached, maxSeats = 6 }) => {
  const seats = Array.from({ length: totalSeats }, (_, i) => String(i + 1));
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) rows.push(seats.slice(i, i + 4));

  const stateOf = (seat) => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (selectedSeats.includes(seat)) return 'selected';
    return 'available';
  };

  const handleClick = (seat) => {
    const state = stateOf(seat);
    if (state === 'booked') return;
    if (state === 'available' && selectedSeats.length >= maxSeats) {
      onMaxReached?.();
      return;
    }
    onToggle?.(seat);
  };

  return (
    <div>
      <div className="mx-auto max-w-xs rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
          <span>Front</span>
          <span className="flex items-center gap-1"><FaCouch /> Driver</span>
        </div>
        <div className="space-y-2">
          {rows.map((row, ri) => (
            <div key={ri} className="flex items-center justify-center gap-2">
              <div className="flex gap-2">
                {row.slice(0, 2).map((s) => (
                  <Seat key={s} seat={s} state={stateOf(s)} onClick={() => handleClick(s)} />
                ))}
              </div>
              <div className="w-6" /> {/* aisle */}
              <div className="flex gap-2">
                {row.slice(2, 4).map((s) => (
                  <Seat key={s} seat={s} state={stateOf(s)} onClick={() => handleClick(s)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded border border-slate-300 bg-white" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-brand-500" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-slate-200" /> Booked
        </span>
      </div>
    </div>
  );
};

export default SeatLayout;
