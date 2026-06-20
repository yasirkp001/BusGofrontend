// Stat tile for the admin dashboard.
// props: title, value, icon (component), accent, hint, gradient (bool -> filled hero card)
const ACCENTS = {
  brand: 'bg-brand-50 text-brand-600',
  green: 'bg-green-50 text-green-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  slate: 'bg-slate-100 text-slate-600',
};

const DashboardCard = ({ title, value, icon: Icon, accent = 'brand', hint, gradient = false }) => {
  if (gradient) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white shadow-pop">
        <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-4 h-24 w-24 rounded-full bg-white/5" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-brand-100">{title}</p>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">{Icon && <Icon size={20} />}</span>
          </div>
          <p className="mt-3 text-3xl font-extrabold tracking-tight">{value}</p>
          {hint && (
            <span className="mt-3 inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">
              {hint}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card group p-5 transition-shadow hover:shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${ACCENTS[accent] || ACCENTS.brand}`}>
          {Icon && <Icon size={20} />}
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-800">{value}</p>
      {hint && (
        <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
          {hint}
        </span>
      )}
    </div>
  );
};

export default DashboardCard;
