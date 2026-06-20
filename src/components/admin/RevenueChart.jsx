import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';
import { formatCurrency } from '../../utils/format.js';

// props: data -> [{ month, revenue }]
const RevenueChart = ({ data = [] }) => {
  const total = data.reduce((sum, d) => sum + (d.revenue || 0), 0);

  return (
    <div className="card p-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <FiTrendingUp size={16} />
            </span>
            Revenue
          </h3>
          <p className="mt-1 text-2xl font-extrabold text-slate-800">{formatCurrency(total)}</p>
        </div>
        <span className="badge bg-slate-100 text-slate-500">by month</span>
      </div>

      {data.length === 0 ? (
        <div className="grid h-64 place-items-center text-sm text-slate-400">No revenue data yet</div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
              />
              <Tooltip
                formatter={(v) => [formatCurrency(v), 'Revenue']}
                contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13, boxShadow: '0 4px 24px -8px rgba(16,24,40,.12)' }}
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RevenueChart;
