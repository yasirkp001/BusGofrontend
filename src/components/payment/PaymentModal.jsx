import { useState } from 'react';
import { FiCreditCard, FiSmartphone, FiGlobe, FiLock, FiCheck, FiX } from 'react-icons/fi';
import { MdQrCode2 } from 'react-icons/md';
import { formatCurrency } from '../../utils/format.js';
import Button from '../common/Button.jsx';

/* ─── Payment method tabs ─────────────────────────────────────── */

const BANKS = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'PNB'];

const UpiTab = ({ onPay, loading }) => {
  const [mode, setMode] = useState('id');
  const [upiId, setUpiId] = useState('');
  const valid = mode === 'qr' || /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9]+$/.test(upiId.trim());

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['id', 'qr'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
              mode === m
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {m === 'id' ? 'UPI ID' : 'QR Code'}
          </button>
        ))}
      </div>

      {mode === 'id' ? (
        <div>
          <label className="label">UPI ID</label>
          <input
            className="input"
            placeholder="yourname@paytm / name@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <p className="mt-1 text-xs text-slate-400">Accepted: PhonePe, GPay, Paytm, BHIM</p>
        </div>
      ) : (
        <div className="flex flex-col items-center py-4">
          <div className="grid h-36 w-36 place-items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
            <MdQrCode2 className="text-6xl text-slate-300" />
          </div>
          <p className="mt-2 text-xs text-slate-400">Scan with any UPI app to pay</p>
        </div>
      )}

      <Button
        onClick={() => onPay({ method: 'upi', detail: mode === 'qr' ? 'QR Scan' : upiId })}
        loading={loading}
        disabled={!valid}
        className="w-full"
      >
        Pay Now
      </Button>
    </div>
  );
};

const isExpiryValid = (exp) => {
  if (exp.length !== 5) return false;
  const [mm, yy] = exp.split('/');
  const month = parseInt(mm, 10);
  const year = 2000 + parseInt(yy, 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return new Date(year, month, 0) >= now;
};

const CardTab = ({ onPay, loading }) => {
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const fmtNumber = (v) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const fmtExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const valid =
    card.number.replace(/\s/g, '').length === 16 &&
    card.name.trim() &&
    isExpiryValid(card.expiry) &&
    card.cvv.length >= 3;

  return (
    <div className="space-y-3">
      <div>
        <label className="label">Card number</label>
        <input
          className="input font-mono tracking-widest"
          placeholder="1234 5678 9012 3456"
          value={card.number}
          onChange={(e) => setCard({ ...card, number: fmtNumber(e.target.value) })}
        />
      </div>
      <div>
        <label className="label">Cardholder name</label>
        <input
          className="input"
          placeholder="Name as on card"
          value={card.name}
          onChange={(e) => setCard({ ...card, name: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Expiry</label>
          <input
            className="input"
            placeholder="MM/YY"
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: fmtExpiry(e.target.value) })}
          />
        </div>
        <div>
          <label className="label">CVV</label>
          <input
            type="password"
            maxLength={4}
            className="input"
            placeholder="•••"
            value={card.cvv}
            onChange={(e) =>
              setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })
            }
          />
        </div>
      </div>
      <Button
        onClick={() => onPay({ method: 'card', detail: `****${card.number.slice(-4)}` })}
        loading={loading}
        disabled={!valid}
        className="w-full"
      >
        Pay Now
      </Button>
    </div>
  );
};

const NetBankingTab = ({ onPay, loading }) => {
  const [bank, setBank] = useState('');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {BANKS.map((b) => (
          <button
            key={b}
            onClick={() => setBank(b)}
            className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors ${
              bank === b
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {b}
          </button>
        ))}
      </div>
      <Button
        onClick={() => onPay({ method: 'netbanking', detail: bank })}
        loading={loading}
        disabled={!bank}
        className="w-full"
      >
        Continue to Bank
      </Button>
    </div>
  );
};

/* ─── Main modal ─────────────────────────────────────────────── */

const TABS = [
  { id: 'upi', label: 'UPI', icon: FiSmartphone },
  { id: 'card', label: 'Card', icon: FiCreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: FiGlobe },
];

const PaymentModal = ({ open, amount, orderId, onSuccess, onClose }) => {
  const [tab, setTab] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'failed'

  if (!open) return null;

  const handlePay = async ({ method, detail }) => {
    setProcessing(true);
    setStatus(null);
    try {
      // Simulate gateway latency (replace with real Razorpay SDK call in production)
      await new Promise((r) => setTimeout(r, 2200));
      const paymentId = `pay_${Math.random().toString(36).slice(2, 18)}`;
      setProcessing(false);
      setStatus('success');
      // Brief success screen, then hand off
      await new Promise((r) => setTimeout(r, 900));
      onSuccess({ paymentId, orderId, method, detail });
    } catch {
      setProcessing(false);
      setStatus('failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={status || processing ? undefined : onClose}
      />

      <div className="relative z-10 w-full max-w-md animate-scale-in overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Gateway header */}
        <div className="flex items-center justify-between bg-slate-900 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
              <FiLock size={16} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">BusGo Payments</p>
              <p className="text-xs text-slate-400">
                {orderId ? `Order #${orderId.slice(-8).toUpperCase()}` : 'Secure checkout'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-extrabold text-white">{formatCurrency(amount)}</p>
            <p className="text-xs text-slate-400">Total due</p>
          </div>
        </div>

        {/* Success screen */}
        {status === 'success' && (
          <div className="flex flex-col items-center px-6 py-14">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
              <FiCheck size={36} />
            </span>
            <p className="mt-5 text-xl font-extrabold text-slate-800">Payment Successful!</p>
            <p className="mt-1 text-sm text-slate-500">Confirming your booking…</p>
            <div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full animate-pulse rounded-full bg-green-500" style={{ width: '100%' }} />
            </div>
          </div>
        )}

        {/* Failed screen */}
        {status === 'failed' && (
          <div className="flex flex-col items-center px-6 py-12">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-red-100 text-red-600">
              <FiX size={36} />
            </span>
            <p className="mt-5 text-xl font-extrabold text-slate-800">Payment Failed</p>
            <p className="mt-1 text-sm text-slate-500">Your card was not charged. Please try again.</p>
            <Button onClick={() => setStatus(null)} variant="secondary" className="mt-5">
              Try again
            </Button>
          </div>
        )}

        {/* Normal payment UI */}
        {!status && (
          <>
            {/* Tab bar */}
            <div className="flex border-b border-slate-100">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => !processing && setTab(id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 py-3.5 text-sm font-medium transition-colors -mb-px ${
                    tab === id
                      ? 'border-brand-500 text-brand-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="px-5 py-5">
              {tab === 'upi' && <UpiTab onPay={handlePay} loading={processing} />}
              {tab === 'card' && <CardTab onPay={handlePay} loading={processing} />}
              {tab === 'netbanking' && <NetBankingTab onPay={handlePay} loading={processing} />}
            </div>

            {/* Security footer */}
            <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 py-3 text-xs text-slate-400">
              <FiLock size={11} /> 256-bit SSL secured · Simulated payments
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
