import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaShieldAlt, FaTags, FaHeadset, FaStar } from 'react-icons/fa';
import { FiSearch, FiMapPin, FiArrowRight, FiClock, FiCreditCard } from 'react-icons/fi';
import { MdEventSeat } from 'react-icons/md';
import { routeService } from '../../services/index.js';
import { todayStr, formatCurrency, formatDuration } from '../../utils/format.js';

const FEATURES = [
  { icon: FaTags, title: 'Best prices', text: 'Transparent fares with no hidden charges, ever.', accent: 'from-emerald-400 to-emerald-600' },
  { icon: FaShieldAlt, title: 'Secure booking', text: 'Bank-grade security on every payment.', accent: 'from-sky-400 to-blue-600' },
  { icon: FaHeadset, title: '24/7 support', text: 'Real humans, ready whenever you need help.', accent: 'from-violet-400 to-purple-600' },
  { icon: FaBus, title: 'Top operators', text: 'Hand-picked, highly-rated bus partners.', accent: 'from-amber-400 to-orange-500' },
];

const STATS = [
  { value: '120+', label: 'Daily routes' },
  { value: '50K+', label: 'Happy travellers' },
  { value: '4.6★', label: 'Avg. rating' },
  { value: '24/7', label: 'Support' },
];

const STEPS = [
  { icon: FiSearch, title: 'Search', text: 'Enter your route and date to see every available bus.' },
  { icon: MdEventSeat, title: 'Pick your seat', text: 'Choose seats on a live, interactive seat map.' },
  { icon: FiCreditCard, title: 'Book & go', text: 'Pay securely and get your e-ticket instantly.' },
];

const Home = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    routeService.list().then((d) => setRoutes(d.routes)).catch(() => {});
  }, []);

  const goToRoute = (source, destination) =>
    navigate(`/search?source=${source}&destination=${destination}&date=${todayStr()}`);

  const fallback = [
    { source: 'Bangalore', destination: 'Chennai' },
    { source: 'Mumbai', destination: 'Pune' },
    { source: 'Delhi', destination: 'Jaipur' },
    { source: 'Hyderabad', destination: 'Bangalore' },
    { source: 'Chennai', destination: 'Bangalore' },
    { source: 'Pune', destination: 'Mumbai' },
  ];
  const routeCards = (routes.length ? routes : fallback).slice(0, 6);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {/* overflow-hidden is on the inner clip div only — NOT the section —   */}
      {/* so the search card can hang below the section without being cut.    */}
      <section className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white pb-28">

        {/* Decorative background — clipped to this div so orbs don't scroll */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-teal-300/15 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <FaBus className="absolute right-8 top-16 hidden animate-float text-white/10 lg:block" size={130} />
          <div
            className="absolute right-14 top-40 hidden animate-float rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur lg:block"
            style={{ animationDelay: '1.2s' }}
          >
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-300/90 text-amber-900">
                <FaStar />
              </span>
              <div>
                <p className="text-lg font-extrabold leading-none">4.6</p>
                <p className="text-xs text-white/70">rated service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero copy — no animation delays that hide content on load */}
        <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
            <FaStar className="text-amber-300" /> India&apos;s smartest way to book buses
          </span>

          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Book bus tickets{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              the easy way
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Compare operators, pick the perfect seat, and travel across India with confidence — all in
            a few taps.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <FiMapPin className="text-amber-300" />
            Bangalore · Mumbai · Delhi · Hyderabad · Chennai &amp; more
          </div>

          {/* Trust stats */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold sm:text-3xl">{s.value}</p>
                <p className="text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular routes */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:pt-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Trending</p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-800 sm:text-3xl">Popular routes</h2>
          </div>
          <button onClick={() => navigate('/search')} className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 sm:flex">
            View all <FiArrowRight />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routeCards.map((r, i) => (
            <button
              key={`${r.source}-${r.destination}-${i}`}
              onClick={() => goToRoute(r.source, r.destination)}
              className="card hover-lift group animate-fade-up overflow-hidden text-left"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative h-24 overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 p-4 text-white">
                <FaBus className="absolute -right-2 -top-1 text-white/15" size={72} />
                <p className="text-xs text-brand-100">starting from</p>
                <p className="text-2xl font-extrabold">{r.baseFare ? formatCurrency(r.baseFare) : '₹—'}</p>
              </div>
              <div className="p-4">
                <p className="flex items-center gap-2 font-semibold text-slate-800">
                  {r.source} <FiArrowRight className="text-slate-300" size={15} /> {r.destination}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-slate-500">
                    <FiClock /> {r.durationHours ? formatDuration(r.durationHours) : 'Multiple trips'}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-brand-600 transition-all group-hover:gap-2">
                    Book now <FiArrowRight size={13} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-16 border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">How it works</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">Book in three simple steps</h2>
          </div>

          <div className="relative mt-12 grid gap-8 sm:grid-cols-3">
            {/* connecting line */}
            <div className="absolute left-1/2 top-7 hidden h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-200 to-transparent sm:block" />
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative animate-fade-up text-center" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-pop ring-8 ring-white">
                  <s.icon size={22} />
                </div>
                <span className="mt-3 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-600">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-800">{s.title}</h3>
                <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why BusGo</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">Everything you need for a smooth trip</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card hover-lift animate-fade-up p-6" style={{ animationDelay: `${i * 70}ms` }}>
              <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.accent} text-white shadow-soft`}>
                <f.icon size={20} />
              </span>
              <h3 className="mt-4 font-bold text-slate-800">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 px-6 py-14 text-center text-white sm:py-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
            <FaBus className="absolute right-8 top-1/2 hidden -translate-y-1/2 animate-float text-white/10 md:block" size={120} />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to hit the road?</h2>
            <p className="mx-auto mt-3 max-w-md text-brand-100">
              Find and book your next bus journey in under a minute.
            </p>
            <button
              onClick={() => navigate('/search')}
              className="btn mt-7 bg-white px-6 text-brand-700 shadow-lg hover:bg-brand-50"
            >
              <FiSearch /> Search buses now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
