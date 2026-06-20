import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    Number(amount) || 0
  );

/** "2026-06-17" -> "Wed, 17 Jun 2026". Falls back gracefully on bad input. */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    return format(parseISO(dateStr), 'EEE, dd MMM yyyy');
  } catch {
    return dateStr;
  }
};

export const formatDateTime = (iso) => {
  if (!iso) return '';
  try {
    return format(parseISO(iso), 'dd MMM yyyy, hh:mm a');
  } catch {
    return iso;
  }
};

/** today's date as YYYY-MM-DD for date inputs */
export const todayStr = () => format(new Date(), 'yyyy-MM-dd');

/** "6.5" hours -> "6h 30m" */
export const formatDuration = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m ? `${h}h ${m}m` : `${h}h`;
};
