import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiLock } from 'react-icons/fi';
import { bookingService, paymentService } from '../../services/index.js';
import { selectBooking, setPassengers, setContact, clearBooking } from '../../redux/slices/bookingSlice.js';
import { selectUser } from '../../redux/slices/authSlice.js';
import PassengerForm from '../../components/booking/PassengerForm.jsx';
import BookingSummary, { computeTotal } from '../../components/booking/BookingSummary.jsx';
import PaymentModal from '../../components/payment/PaymentModal.jsx';
import Button from '../../components/common/Button.jsx';
import { formatCurrency } from '../../utils/format.js';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector(selectBooking);
  const user = useSelector(selectUser);

  const { schedule, selectedSeats } = booking;
  const [passengers, setLocalPassengers] = useState(booking.passengers);
  const [contact, setLocalContact] = useState(
    booking.contact.email ? booking.contact : { email: user?.email || '', phone: user?.phone || '' }
  );
  const [initiating, setInitiating] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Guard: no trip/seats → back to search
  useEffect(() => {
    if (!schedule || selectedSeats.length === 0) {
      navigate('/search', { replace: true });
    }
  }, [schedule, selectedSeats, navigate]);

  if (!schedule || selectedSeats.length === 0) return null;

  const total = computeTotal(schedule.fare, selectedSeats.length);

  const validate = () => {
    for (const seat of selectedSeats) {
      const p = passengers.find((x) => x.seat === seat);
      if (!p || !p.name?.trim()) return `Enter a name for seat ${seat}`;
      if (!p.age || Number(p.age) < 1) return `Enter a valid age for seat ${seat}`;
    }
    if (!contact.email?.trim()) return 'Enter a contact email';
    if (!contact.phone?.trim()) return 'Enter a contact phone';
    return null;
  };

  // Step 1: validate form → create a payment order → open modal
  const initiatePayment = async () => {
    const err = validate();
    if (err) return toast.error(err);

    setInitiating(true);
    dispatch(setPassengers(passengers));
    dispatch(setContact(contact));
    try {
      const data = await paymentService.createOrder({ amount: total });
      setOrderId(data.orderId);
      setShowPayment(true);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setInitiating(false);
    }
  };

  // Step 2: payment gateway reports success → verify + create booking
  const handlePaymentSuccess = async ({ paymentId, orderId: pOrderId }) => {
    try {
      await paymentService.verify({ orderId: pOrderId, paymentId });
      const data = await bookingService.create({
        scheduleId: schedule.id,
        seats: selectedSeats,
        passengers: passengers.map((p) => ({ ...p, age: Number(p.age) })),
        contact,
        paymentId,
        orderId: pOrderId,
      });
      toast.success('Booking confirmed!');
      dispatch(clearBooking());
      navigate(`/booking-success/${data.booking.id}`, { replace: true });
    } catch (e) {
      setShowPayment(false);
      if (e.status === 409) {
        // Seats were taken between selection and payment — go back to pick new ones
        toast.error('Some seats are no longer available. Please select different seats.');
        navigate(`/booking/${schedule.id}/seats`, { replace: true });
      } else {
        toast.error(e.message || 'Booking failed after payment. Please contact support.');
      }
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-xl font-bold text-slate-800">Checkout</h1>
      <p className="text-sm text-slate-500">Review passenger details and proceed to payment.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <PassengerForm
          seats={selectedSeats}
          passengers={passengers}
          contact={contact}
          onPassengersChange={setLocalPassengers}
          onContactChange={setLocalContact}
        />

        <div className="space-y-4">
          <BookingSummary schedule={schedule} seats={selectedSeats}>
            <Button onClick={initiatePayment} loading={initiating} className="mt-4 w-full">
              <FiLock /> Pay {formatCurrency(total)}
            </Button>
            <p className="mt-2 text-center text-xs text-slate-400">
              256-bit SSL secured · Simulated payments
            </p>
          </BookingSummary>
        </div>
      </div>

      <PaymentModal
        open={showPayment}
        amount={total}
        orderId={orderId}
        onSuccess={handlePaymentSuccess}
        onClose={() => setShowPayment(false)}
      />
    </div>
  );
};

export default Checkout;
