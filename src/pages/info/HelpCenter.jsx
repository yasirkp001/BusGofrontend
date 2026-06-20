import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiSearch, FiCreditCard, FiCalendar, FiUser, FiHelpCircle } from 'react-icons/fi';
import PageHero from '../../components/common/PageHero.jsx';

const CATEGORIES = [
  { icon: FiCalendar, title: 'Bookings', text: 'Search, seats, and tickets' },
  { icon: FiCreditCard, title: 'Payments', text: 'Charges, invoices, methods' },
  { icon: FiUser, title: 'Account', text: 'Profile, login, security' },
  { icon: FiHelpCircle, title: 'General', text: 'Everything else' },
];

const FAQS = [
  { q: 'How do I book a bus ticket?', a: 'Search your route and date on the home page, choose a bus, pick your seats on the live seat map, enter passenger details, and confirm payment. Your e-ticket is generated instantly.' },
  { q: 'Can I choose my own seat?', a: 'Yes. Every trip shows a live seat map where you can select any available seat (up to 6 per booking). Booked seats are greyed out.' },
  { q: 'How do I view or manage my bookings?', a: 'Log in and open “My Bookings” from the navbar. There you can review trip details and cancel a booking if needed.' },
  { q: 'How do I cancel a booking?', a: 'Go to My Bookings, open the booking, and tap “Cancel booking”. The seats are released immediately. See our Cancellation policy for charges.' },
  { q: 'When will I get my refund?', a: 'Refunds are processed to your original payment method, typically within 5–7 business days. See the Refunds page for details.' },
  { q: 'Is my payment secure?', a: 'Yes. Payments are processed over secure, encrypted connections and we never store your card details.' },
];

const FaqItem = ({ item, open, onToggle }) => (
  <div className="card overflow-hidden">
    <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
      <span className="font-medium text-slate-800">{item.q}</span>
      <FiChevronDown className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{item.a}</div>}
  </div>
);

const HelpCenter = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const [query, setQuery] = useState('');

  const filtered = FAQS.filter(
    (f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <PageHero eyebrow="Help Center" title="How can we help?" subtitle="Find quick answers to the most common questions about booking, payments, and your account." />

      <section className="mx-auto max-w-4xl px-4 py-12">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-11"
            placeholder="Search help articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <div key={c.title} className="card hover-lift animate-fade-up p-4" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <c.icon size={18} />
              </span>
              <h3 className="mt-3 text-sm font-bold text-slate-800">{c.title}</h3>
              <p className="text-xs text-slate-500">{c.text}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-12 text-xl font-bold text-slate-800">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <p className="card p-6 text-center text-sm text-slate-500">No articles match “{query}”.</p>
          ) : (
            filtered.map((f, i) => (
              <FaqItem key={f.q} item={f} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
            ))
          )}
        </div>

        {/* Still need help */}
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-center text-white">
          <h3 className="text-xl font-bold">Still need help?</h3>
          <p className="mx-auto mt-2 max-w-md text-brand-100">Our support team is available 24/7 to help you out.</p>
          <Link to="/contact" className="btn mt-5 bg-white text-brand-700 hover:bg-brand-50">Contact support</Link>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
