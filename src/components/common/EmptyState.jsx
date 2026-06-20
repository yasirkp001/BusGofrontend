import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ icon: Icon = FiInbox, title = 'Nothing here yet', subtitle, action }) => (
  <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-400">
      <Icon size={28} />
    </span>
    <h3 className="mt-4 text-base font-semibold text-slate-700">{title}</h3>
    {subtitle && <p className="mt-1 max-w-sm text-sm text-slate-400">{subtitle}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
