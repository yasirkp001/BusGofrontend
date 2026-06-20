import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTruck, FiBookmark, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import { adminService } from '../../services/index.js';
import DashboardCard from '../../components/admin/DashboardCard.jsx';
import RevenueChart from '../../components/admin/RevenueChart.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { StatCardSkeleton, Skeleton } from '../../components/common/Skeleton.jsx';
import { formatCurrency, formatDate } from '../../utils/format.js';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .dashboard()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" subtitle="Overview of your bus booking platform." />
        <StatCardSkeleton />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <PageHeader title="Dashboard" />
        <EmptyState title="Couldn't load the dashboard" subtitle="Please refresh the page or check the API server." />
      </div>
    );
  }

  const { stats, revenueByMonth, recentBookings } = data;

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Overview of your bus booking platform." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          <DashboardCard key="rev" gradient title="Total revenue" value={formatCurrency(stats.totalRevenue)} icon={FiDollarSign} hint={`${stats.confirmedBookings} confirmed`} />,
          <DashboardCard key="bk" title="Bookings" value={stats.totalBookings} icon={FiBookmark} accent="brand" hint={`${stats.cancelledBookings} cancelled`} />,
          <DashboardCard key="us" title="Users" value={stats.totalUsers} icon={FiUsers} accent="amber" />,
          <DashboardCard key="br" title="Buses / Routes" value={`${stats.totalBuses} / ${stats.totalRoutes}`} icon={FiTruck} accent="slate" hint={`${stats.totalSchedules} schedules`} />,
        ].map((card, i) => (
          <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            {card}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <RevenueChart data={revenueByMonth} />

        <div className="card flex flex-col p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Recent bookings</h3>
            <Link to="/admin/bookings" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="grid flex-1 place-items-center py-10 text-sm text-slate-400">No bookings yet.</div>
          ) : (
            <div className="-mx-2 divide-y divide-slate-100">
              {recentBookings.map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                    {(b.user?.name || 'G').charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{b.user?.name || 'Guest'}</p>
                    <p className="truncate text-xs text-slate-500">
                      {b.source} → {b.destination} • {formatDate(b.journeyDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{formatCurrency(b.totalAmount)}</p>
                    <StatusBadge status={b.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
