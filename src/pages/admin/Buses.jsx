import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiTruck } from 'react-icons/fi';
import { busService } from '../../services/index.js';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { TableSkeleton } from '../../components/common/Skeleton.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';

const BUS_TYPES = ['AC Sleeper', 'AC Seater', 'Non-AC Sleeper', 'Non-AC Seater'];
const EMPTY = { name: '', busNumber: '', type: 'AC Seater', operator: '', totalSeats: 40, rating: 4, amenities: '' };

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    busService.list().then((d) => setBuses(d.buses)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setModal(true);
  };
  const openEdit = (bus) => {
    setEditing(bus);
    setForm({ ...bus, amenities: (bus.amenities || []).join(', ') });
    setModal(true);
  };

  const save = async () => {
    if (!form.name || !form.type) return toast.error('Name and type are required');
    setSaving(true);
    const payload = {
      ...form,
      totalSeats: Number(form.totalSeats),
      rating: Number(form.rating),
      amenities: form.amenities.split(',').map((a) => a.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await busService.update(editing.id, payload);
        toast.success('Bus updated');
      } else {
        await busService.create(payload);
        toast.success('Bus added');
      }
      setModal(false);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (bus) => {
    if (!window.confirm(`Delete bus "${bus.name}"?`)) return;
    try {
      await busService.remove(bus.id);
      setBuses((prev) => prev.filter((b) => b.id !== bus.id));
      toast.success('Bus deleted');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const addBtn = (
    <Button onClick={openCreate}>
      <FiPlus /> Add bus
    </Button>
  );

  return (
    <div>
      <PageHeader title="Buses" subtitle={loading ? 'Manage your fleet.' : `${buses.length} buses in your fleet.`} action={addBtn} />

      {loading ? (
        <TableSkeleton cols={6} />
      ) : buses.length === 0 ? (
        <EmptyState icon={FiTruck} title="No buses yet" subtitle="Add your first bus to start scheduling trips." action={addBtn} />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="admin-th">Bus</th>
                  <th className="admin-th">Type</th>
                  <th className="admin-th">Seats</th>
                  <th className="admin-th">Rating</th>
                  <th className="admin-th">Amenities</th>
                  <th className="admin-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buses.map((b) => (
                  <tr key={b.id} className="transition-colors hover:bg-slate-50">
                    <td className="admin-td">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
                          <FiTruck size={16} />
                        </span>
                        <div>
                          <p className="font-medium text-slate-800">{b.name}</p>
                          <p className="text-xs text-slate-400">{b.busNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="admin-td"><span className="badge bg-slate-100 text-slate-600">{b.type}</span></td>
                    <td className="admin-td">{b.totalSeats}</td>
                    <td className="admin-td">⭐ {b.rating}</td>
                    <td className="admin-td max-w-xs truncate text-slate-400">{(b.amenities || []).join(', ') || '—'}</td>
                    <td className="admin-td">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(b)} className="icon-btn" title="Edit"><FiEdit2 size={16} /></button>
                        <button onClick={() => remove(b)} className="icon-btn-danger" title="Delete"><FiTrash2 size={16} /></button>
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
        title={editing ? 'Edit bus' : 'Add bus'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button onClick={save} loading={saving}>{editing ? 'Save' : 'Add'}</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Bus number</label>
            <input className="input" value={form.busNumber} onChange={(e) => setForm({ ...form, busNumber: e.target.value })} />
          </div>
          <div>
            <label className="label">Type</label>
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {BUS_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Operator</label>
            <input className="input" value={form.operator} onChange={(e) => setForm({ ...form, operator: e.target.value })} />
          </div>
          <div>
            <label className="label">Total seats</label>
            <input type="number" min="1" className="input" value={form.totalSeats} onChange={(e) => setForm({ ...form, totalSeats: e.target.value })} />
          </div>
          <div>
            <label className="label">Rating</label>
            <input type="number" step="0.1" min="0" max="5" className="input" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Amenities (comma separated)</label>
            <input className="input" placeholder="WiFi, Charging Point, Blanket" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Buses;
