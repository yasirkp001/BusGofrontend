// Collects passenger details — one block per selected seat — plus contact info.
// props: seats[], passengers[], contact{}, onPassengersChange(fn), onContactChange(fn)
const PassengerForm = ({ seats = [], passengers = [], contact = {}, onPassengersChange, onContactChange }) => {
  const updatePassenger = (seat, field, value) => {
    const next = seats.map((s) => {
      const existing = passengers.find((p) => p.seat === s) || { seat: s, name: '', age: '', gender: 'Male' };
      return s === seat ? { ...existing, [field]: value } : existing;
    });
    onPassengersChange(next);
  };

  const valueFor = (seat, field, fallback = '') => {
    const p = passengers.find((x) => x.seat === seat);
    return p?.[field] ?? fallback;
  };

  return (
    <div className="space-y-5">
      <div className="card p-5">
        <h3 className="mb-4 text-base font-semibold text-slate-800">Passenger details</h3>
        <div className="space-y-4">
          {seats.map((seat) => (
            <div key={seat} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="badge bg-brand-50 text-brand-700">Seat {seat}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <label className="label">Full name</label>
                  <input
                    className="input"
                    placeholder="Passenger name"
                    value={valueFor(seat, 'name')}
                    onChange={(e) => updatePassenger(seat, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    className="input"
                    placeholder="Age"
                    value={valueFor(seat, 'age')}
                    onChange={(e) => updatePassenger(seat, 'age', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Gender</label>
                  <select
                    className="input"
                    value={valueFor(seat, 'gender', 'Male')}
                    onChange={(e) => updatePassenger(seat, 'gender', e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="mb-4 text-base font-semibold text-slate-800">Contact details</h3>
        <p className="mb-3 text-sm text-slate-500">Your ticket will be sent here.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={contact.email || ''}
              onChange={(e) => onContactChange({ ...contact, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              className="input"
              placeholder="10-digit mobile"
              value={contact.phone || ''}
              onChange={(e) => onContactChange({ ...contact, phone: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
