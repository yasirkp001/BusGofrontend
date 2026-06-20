import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import PageHero from '../../components/common/PageHero.jsx';
import Button from '../../components/common/Button.jsx';

const INFO = [
  { icon: FiMail, label: 'Email', value: 'support@busgo.demo', href: 'mailto:support@busgo.demo' },
  { icon: FiPhone, label: 'Phone', value: '+91 1800 200 1234', href: 'tel:+918002001234' },
  { icon: FiMapPin, label: 'Office', value: 'MG Road, Bangalore, India' },
  { icon: FiClock, label: 'Hours', value: 'Support available 24 / 7' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    // Demo: no mail backend — simulate a send.
    setTimeout(() => {
      toast.success('Thanks! We’ll get back to you shortly.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 600);
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact us"
        title="We’d love to hear from you"
        subtitle="Questions, feedback, or partnership ideas — reach out and our team will respond as soon as possible."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact info */}
          <div className="space-y-4">
            {INFO.map((item, i) => (
              <div key={item.label} className="card hover-lift flex animate-fade-up items-center gap-4 p-5" style={{ animationDelay: `${i * 70}ms` }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <item.icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-slate-800 hover:text-brand-600">{item.value}</a>
                  ) : (
                    <p className="font-medium text-slate-800">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={submit} className="card animate-fade-up p-6 sm:p-8" style={{ animationDelay: '120ms' }}>
            <h2 className="text-lg font-bold text-slate-800">Send us a message</h2>
            <p className="mt-1 text-sm text-slate-500">Fill in the form and we’ll be in touch.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Name</label>
                <input name="name" required className="input" placeholder="Your name" value={form.name} onChange={onChange} />
              </div>
              <div>
                <label className="label">Email</label>
                <input name="email" type="email" required className="input" placeholder="you@example.com" value={form.email} onChange={onChange} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Subject</label>
                <input name="subject" required className="input" placeholder="How can we help?" value={form.subject} onChange={onChange} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Message</label>
                <textarea name="message" required rows={5} className="input resize-none" placeholder="Tell us more…" value={form.message} onChange={onChange} />
              </div>
            </div>
            <Button type="submit" loading={sending} className="mt-5 w-full sm:w-auto">
              <FiSend /> Send message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
