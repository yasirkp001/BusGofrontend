import { Link } from 'react-router-dom';
import { FiCreditCard, FiClock, FiRefreshCw, FiXOctagon } from 'react-icons/fi';
import PageHero from '../../components/common/PageHero.jsx';

const TIMELINE = [
  { icon: FiRefreshCw, title: 'Cancellation', text: 'You cancel an eligible booking from My Bookings.' },
  { icon: FiClock, title: 'Processing', text: 'We calculate the eligible amount and initiate the refund the same day.' },
  { icon: FiCreditCard, title: 'Credited', text: 'The amount reaches your original payment method in 5–7 business days.' },
];

const Refunds = () => (
  <div>
    <PageHero
      eyebrow="Policy"
      title="Refunds policy"
      subtitle="Eligible cancellations are refunded to your original payment method. Here’s how and when it happens."
    />

    <section className="mx-auto max-w-4xl px-4 py-16">
      {/* How refunds work */}
      <h2 className="text-xl font-bold text-slate-800">How refunds work</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {TIMELINE.map((t, i) => (
          <div key={t.title} className="card relative animate-fade-up p-6" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-pop">
              <t.icon size={18} />
            </span>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-brand-600">Step {i + 1}</p>
            <h3 className="mt-1 font-bold text-slate-800">{t.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{t.text}</p>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="card mt-10 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-800">Refund details</h2>
        <dl className="mt-4 divide-y divide-slate-100">
          {[
            ['Refund method', 'Original payment method used at booking (card, UPI, wallet).'],
            ['Processing time', 'Initiated immediately; credited within 5–7 business days.'],
            ['Refund amount', 'Ticket fare minus applicable cancellation charges and taxes.'],
            ['Confirmation', 'You’ll see the booking marked as “refunded” in My Bookings.'],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 py-3 sm:grid-cols-[200px_1fr]">
              <dt className="text-sm font-medium text-slate-500">{k}</dt>
              <dd className="text-sm text-slate-700">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Non-refundable */}
      <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/60 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <FiXOctagon className="text-red-500" /> Non-refundable cases
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• No-shows or partially used tickets.</li>
          <li>• Cancellations made less than 4 hours before departure.</li>
          <li>• Convenience fees and taxes, where applicable.</li>
        </ul>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Refund not received in time?{' '}
        <Link to="/contact" className="font-semibold text-brand-600 hover:underline">Contact our support team</Link>{' '}
        and we’ll sort it out. See also our{' '}
        <Link to="/cancellation" className="font-semibold text-brand-600 hover:underline">Cancellation policy</Link>.
      </p>
    </section>
  </div>
);

export default Refunds;
