// Reusable gradient header for informational pages (About, Contact, etc.).
const PageHero = ({ eyebrow, title, subtitle }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    />
    <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
      {eyebrow && (
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-wider text-brand-100">{eyebrow}</p>
      )}
      <h1 className="mt-2 max-w-3xl animate-fade-up text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl" style={{ animationDelay: '60ms' }}>
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl animate-fade-up text-lg leading-relaxed text-brand-100" style={{ animationDelay: '120ms' }}>
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHero;
