import { Link } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import PageHero from '../../components/common/PageHero.jsx';

const FEES = [
  { window: 'More than 24 hours before departure', fee: '10%', tone: 'text-green-600' },
  { window: '12 – 24 hours before departure', fee: '25%', tone: 'text-green-600' },
  { window: '4 – 12 hours before departure', fee: '50%', tone: 'text-amber-600' },
  { window: 'Less than 4 hours before departure', fee: 'No refund', tone: 'text-red-600' },
];

const STEPS = [
  'Log in and open “My Bookings” from the navbar.',
  'Find the trip you want to cancel and open it.',
  'Tap “Cancel booking” and confirm.',
  'Your seats are released instantly and any eligible refund is initiated.',
];

const Cancellation = () => (
  <div>
    <PageHero
      eyebrow="Policy"
      title="Cancellation policy"
      subtitle="Plans change — here’s exactly how cancellations and charges work so there are no surprises."
    />

    <section className="mx-auto max-w-4xl px-4 py-16">
      {/* Fees table */}
      <h2 className="text-xl font-bold text-slate-800">Cancellation charges</h2>
      <p className="mt-2 text-sm text-slate-500">
        The charge depends on how far in advance you cancel before the scheduled departure.
      </p>
      <div className="card mt-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Cancellation window</th>
              <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">Charge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {FEES.map((f) => (
              <tr key={f.window} className="hover:bg-slate-50">
                <td className="px-5 py-3.5 text-slate-700">{f.window}</td>
                <td className={`px-5 py-3.5 text-right font-semibold ${f.tone}`}>{f.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex items-start gap-2 text-xs text-slate-500">
        <FiAlertCircle className="mt-0.5 shrink-0 text-amber-500" />
        Charges are a percentage of the ticket fare. The remaining amount is refunded per our Refunds policy.
      </p>

      {/* How to cancel */}
      <h2 className="mt-12 text-xl font-bold text-slate-800">How to cancel a booking</h2>
      <div className="card mt-4 p-6">
        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                {i + 1}
              </span>
              <p className="pt-0.5 text-slate-600">{s}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Notes */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <FiCheckCircle className="text-brand-600" /> Good to know
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Partially used tickets are not eligible for cancellation.</li>
          <li>• Some operators may set their own cancellation rules, shown at checkout.</li>
          <li>• Once a refund is initiated, see the <Link to="/refunds" className="font-medium text-brand-600 hover:underline">Refunds policy</Link> for timelines.</li>
        </ul>
      </div>
    </section>
  </div>
);

export default Cancellation;
