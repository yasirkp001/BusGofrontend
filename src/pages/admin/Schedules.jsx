import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { scheduleService, busService, routeService } from '../../services/index.js';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { TableSkeleton } from '../../components/common/Skeleton.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import { formatCurrency, formatDate, todayStr } from '../../utils/format.js';

const emptyForm = () => ({ busId: '', routeId: '', date: todayStr(), departureTime: '08:00', arrivalTime: '14:00', fare: 700 });

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([scheduleService.listAll(), busService.list(), routeService.list()])
      .then(([s, b, r]) => {
        setSchedules(s.schedules);
        setBuses(b.buses);
        setRoutes(r.routes);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm(), busId: buses[0]?.id || '', routeId: routes[0]?.id || '' });
    setModal(true);
  };
  const openEdit = (s) => {
    setEditing(s);
    setForm({ busId: s.busId, routeId: s.routeId, date: s.date, departureTime: s.departureTime, arrivalTime: s.arrivalTime, fare: s.fare });
    setModal(true);
  };

  const save = async () => {
    if (!form.busId || !form.routeId || !form.date) return toast.error('Bus, route and date are required');
    setSaving(true);
    try {
      if (editing) {
        await scheduleService.update(editing.id, { date: form.date, departureTime: form.departureTime, arrivalTime: form.arrivalTime, fare: Number(form.fare) });
        toast.success('Schedule updated');
      } else {
        await scheduleService.create({ ...form, fare: Number(form.fare) });
        toast.success('Schedule added');
      }
      setModal(false);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s) => {
    if (!window.confirm('Delete this schedule?')) return;
    try {
      await scheduleService.remove(s.id);
      setSchedules((prev) => prev.filter((x) => x.id !== s.id));
      toast.success('Schedule deleted');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const addBtn = (
    <Button onClick={openCreate}>
      <FiPlus /> Add schedule
    </Button>
  );

  // occupancy color hint
  const seatTone = (avail, total) => {
    const ratio = total ? avail / total : 0;
    if (ratio === 0) return 'bg-red-50 text-red-600';
    if (ratio < 0.25) return 'bg-amber-50 text-amber-700';
    return 'bg-green-50 text-green-700';
  };

  return (
    <div>
      <PageHeader title="Schedules" subtitle={loading ? 'Trips across your routes.' : `${schedules.length} trips scheduled.`} action={addBtn} />

      {loading ? (
        <TableSkeleton cols={7} rows={8} />
      ) : schedules.length === 0 ? (
        <EmptyState icon={FiCalendar} title="No schedules yet" subtitle="Schedule a trip by assigning a bus to a route." action={addBtn} />
      ) : (
        <div className="card overflow-hidden">
          <div className="max-h-[65vh] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="admin-th">Route</th>
                  <th className="admin-th">Bus</th>
                  <th className="admin-th">Date</th>
                  <th className="admin-th">Timing</th>
                  <th className="admin-th">Seats</th>
                  <th className="admin-th">Fare</th>
                  <th className="admin-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedules.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-slate-50">
                    <td className="admin-td">
                      <span className="flex items-center gap-1.5 font-medium text-slate-800">
                        {s.route?.source} <FiArrowRight className="text-slate-300" size={13} /> {s.route?.destination}
                      </span>
                    </td>
                    <td className="admin-td">{s.bus?.name}</td>
                    <td className="admin-td">{formatDate(s.date)}</td>
                    <td className="admin-td">{s.departureTime} – {s.arrivalTime}</td>
                    <td className="admin-td">
                      <span className={`badge ${seatTone(s.availableSeats, s.totalSeats)}`}>{s.availableSeats}/{s.totalSeats}</span>
                    </td>
                    <td className="admin-td font-medium text-slate-700">{formatCurrency(s.fare)}</td>
                    <td className="admin-td">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(s)} className="icon-btn" title="Edit"><FiEdit2 size={16} /></button>
                        <button onClick={() => remove(s)} className="icon-btn-danger" title="Delete"><FiTrash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? 'Edit schedule' : 'Add schedule'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button onClick={save} loading={saving}>{editing ? 'Save' : 'Add'}</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Route</label>
            <select className="input" value={form.routeId} disabled={!!editing} onChange={(e) => setForm({ ...form, routeId: e.target.value })}>
              <option value="">Select route</option>
              {routes.map((r) => <option key={r.id} value={r.id}>{r.source} → {r.destination}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Bus</label>
            <select className="input" value={form.busId} disabled={!!editing} onChange={(e) => setForm({ ...form, busId: e.target.value })}>
              <option value="">Select bus</option>
              {buses.map((b) => <option key={b.id} value={b.id}>{b.name} ({b.type})</option>)}
            </select>
          </div>
          <div>
            <label className="label">Date</label>
            <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="label">Fare (₹)</label>
            <input type="number" className="input" value={form.fare} onChange={(e) => setForm({ ...form, fare: e.target.value })} />
          </div>
          <div>
            <label className="label">Departure</label>
            <input type="time" className="input" value={form.departureTime} onChange={(e) => setForm({ ...form, departureTime: e.target.value })} />
          </div>
          <div>
            <label className="label">Arrival</label>
            <input type="time" className="input" value={form.arrivalTime} onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })} />
          </div>
        </div>
        {editing && <p className="mt-3 text-xs text-slate-400">Bus and route can't be changed on an existing schedule.</p>}
      </Modal>
    </div>
  );
};

export default Schedules;
