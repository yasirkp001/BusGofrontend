import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiMap, FiArrowRight } from 'react-icons/fi';
import { routeService } from '../../services/index.js';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { TableSkeleton } from '../../components/common/Skeleton.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import { formatCurrency, formatDuration } from '../../utils/format.js';

const EMPTY = { source: '', destination: '', distanceKm: 300, durationHours: 6, baseFare: 700 };

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    routeService.list().then((d) => setRoutes(d.routes)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setModal(true);
  };
  const openEdit = (r) => {
    setEditing(r);
    setForm(r);
    setModal(true);
  };

  const save = async () => {
    if (!form.source || !form.destination) return toast.error('Source and destination are required');
    setSaving(true);
    const payload = {
      ...form,
      distanceKm: Number(form.distanceKm),
      durationHours: Number(form.durationHours),
      baseFare: Number(form.baseFare),
    };
    try {
      if (editing) {
        await routeService.update(editing.id, payload);
        toast.success('Route updated');
      } else {
        await routeService.create(payload);
        toast.success('Route added');
      }
      setModal(false);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (r) => {
    if (!window.confirm(`Delete route ${r.source} → ${r.destination}?`)) return;
    try {
      await routeService.remove(r.id);
      setRoutes((prev) => prev.filter((x) => x.id !== r.id));
      toast.success('Route deleted');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const addBtn = (
    <Button onClick={openCreate}>
      <FiPlus /> Add route
    </Button>
  );

  return (
    <div>
      <PageHeader title="Routes" subtitle="Cities and base fares." action={addBtn} />

      {loading ? (
        <TableSkeleton cols={5} />
      ) : routes.length === 0 ? (
        <EmptyState icon={FiMap} title="No routes yet" subtitle="Add a route to connect two cities." action={addBtn} />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="admin-th">Route</th>
                  <th className="admin-th">Distance</th>
                  <th className="admin-th">Duration</th>
                  <th className="admin-th">Base fare</th>
                  <th className="admin-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {routes.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-slate-50">
                    <td className="admin-td">
                      <span className="flex items-center gap-2 font-medium text-slate-800">
                        {r.source} <FiArrowRight className="text-slate-300" size={14} /> {r.destination}
                      </span>
                    </td>
                    <td className="admin-td">{r.distanceKm} km</td>
                    <td className="admin-td">{formatDuration(r.durationHours)}</td>
                    <td className="admin-td font-medium text-slate-700">{formatCurrency(r.baseFare)}</td>
                    <td className="admin-td">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(r)} className="icon-btn" title="Edit"><FiEdit2 size={16} /></button>
                        <button onClick={() => remove(r)} className="icon-btn-danger" title="Delete"><FiTrash2 size={16} /></button>
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
        title={editing ? 'Edit route' : 'Add route'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button onClick={save} loading={saving}>{editing ? 'Save' : 'Add'}</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Source</label>
            <input className="input" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
          </div>
          <div>
            <label className="label">Destination</label>
            <input className="input" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
          </div>
          <div>
            <label className="label">Distance (km)</label>
            <input type="number" className="input" value={form.distanceKm} onChange={(e) => setForm({ ...form, distanceKm: e.target.value })} />
          </div>
          <div>
            <label className="label">Duration (hours)</label>
            <input type="number" step="0.5" className="input" value={form.durationHours} onChange={(e) => setForm({ ...form, durationHours: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Base fare (₹)</label>
            <input type="number" className="input" value={form.baseFare} onChange={(e) => setForm({ ...form, baseFare: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Routes;
