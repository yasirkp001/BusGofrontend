import { FiMapPin, FiClock, FiArrowRight, FiHeart, FiTrendingUp, FiHome, FiGift } from 'react-icons/fi';
import PageHero from '../../components/common/PageHero.jsx';

const PERKS = [
  { icon: FiHome, title: 'Remote-friendly', text: 'Work from where you do your best thinking.' },
  { icon: FiTrendingUp, title: 'Growth', text: 'Learning budget and clear career paths.' },
  { icon: FiHeart, title: 'Health cover', text: 'Medical insurance for you and your family.' },
  { icon: FiGift, title: 'Travel perks', text: 'Free and discounted trips on the platform.' },
];

const ROLES = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Bangalore / Remote', type: 'Full-time' },
  { title: 'Backend Engineer (Node.js)', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Designer', dept: 'Design', location: 'Bangalore', type: 'Full-time' },
  { title: 'Customer Support Specialist', dept: 'Operations', location: 'Remote', type: 'Full-time' },
  { title: 'Growth Marketing Lead', dept: 'Marketing', location: 'Mumbai', type: 'Full-time' },
];

const Careers = () => (
  <div>
    <PageHero
      eyebrow="Careers"
      title="Build the future of travel with us"
      subtitle="We’re a small, fast-moving team on a mission to make intercity travel delightful. Come help millions of people get where they’re going."
    />

    {/* Perks */}
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why join</p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">Perks &amp; benefits</h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PERKS.map((p, i) => (
          <div key={p.title} className="card hover-lift animate-fade-up p-6" style={{ animationDelay: `${i * 70}ms` }}>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <p.icon size={20} />
            </span>
            <h3 className="mt-4 font-bold text-slate-800">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{p.text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Open roles */}
    <section className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Open positions</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">{ROLES.length} roles open</h2>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {ROLES.map((r, i) => (
            <a
              key={r.title}
              href={`mailto:careers@busgo.demo?subject=Application: ${encodeURIComponent(r.title)}`}
              className="card hover-lift group flex animate-fade-up flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div>
                <h3 className="font-semibold text-slate-800">{r.title}</h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span className="badge bg-brand-50 text-brand-700">{r.dept}</span>
                  <span className="flex items-center gap-1"><FiMapPin size={13} /> {r.location}</span>
                  <span className="flex items-center gap-1"><FiClock size={13} /> {r.type}</span>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2">
                Apply <FiArrowRight size={15} />
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don’t see your role?{' '}
          <a href="mailto:careers@busgo.demo" className="font-semibold text-brand-600 hover:underline">
            Send us your résumé
          </a>{' '}
          — we’re always looking for great people.
        </p>
      </div>
    </section>
  </div>
);

export default Careers;
