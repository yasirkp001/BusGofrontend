// Pill badge with a status dot. Defaults cover booking statuses.
const STYLES = {
  confirmed: { wrap: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  paid: { wrap: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  cancelled: { wrap: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
  refunded: { wrap: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  pending: { wrap: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
};

const StatusBadge = ({ status }) => {
  const s = STYLES[status] || STYLES.pending;
  return (
    <span className={`badge gap-1.5 capitalize ${s.wrap}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
