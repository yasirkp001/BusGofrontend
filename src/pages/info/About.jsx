import { Link } from 'react-router-dom';
import { FaBus } from 'react-icons/fa';
import { FiTarget, FiHeart, FiShield, FiZap, FiArrowRight } from 'react-icons/fi';
import PageHero from '../../components/common/PageHero.jsx';

const STATS = [
  { value: '120+', label: 'Routes covered' },
  { value: '50K+', label: 'Travellers served' },
  { value: '40+', label: 'Bus partners' },
  { value: '4.6★', label: 'Average rating' },
];

const VALUES = [
  { icon: FiHeart, title: 'Customer first', text: 'Every decision starts with the traveller’s experience in mind.' },
  { icon: FiShield, title: 'Trust & safety', text: 'Secure payments and verified operators on every journey.' },
  { icon: FiZap, title: 'Simplicity', text: 'Booking a seat should take seconds, not minutes.' },
  { icon: FiTarget, title: 'Reliability', text: 'On-time information you can plan your trip around.' },
];

const About = () => (
  <div>
    <PageHero
      eyebrow="About BusGo"
      title="Making bus travel effortless across India"
      subtitle="We connect millions of travellers with trusted bus operators — bringing transparent pricing, live seat selection, and a booking flow that just works."
    />

    {/* Mission */}
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our mission</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">
            Travel that’s simple, fair, and comfortable
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            BusGo started with a simple idea: booking a bus ticket should be as easy as ordering food online.
            No hidden charges, no guessing which seat you’ll get, no endless phone calls.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            Today we work with dozens of operators to bring you a single place to compare buses, pick the perfect
            seat on a live map, and manage every booking in one tap.
          </p>
          <Link to="/search" className="btn-primary mt-6 inline-flex">
            Find your next trip <FiArrowRight />
          </Link>
        </div>
        <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="card overflow-hidden">
            <div className="flex h-56 items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700">
              <FaBus className="text-white/90" size={96} />
            </div>
            <div className="grid grid-cols-2 gap-px bg-slate-100">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white p-5 text-center">
                  <p className="text-2xl font-extrabold text-slate-800">{s.value}</p>
                  <p className="text-sm text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">What we stand for</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">Our values</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className="card hover-lift animate-fade-up p-6" style={{ animationDelay: `${i * 70}ms` }}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <v.icon size={20} />
              </span>
              <h3 className="mt-4 font-bold text-slate-800">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
