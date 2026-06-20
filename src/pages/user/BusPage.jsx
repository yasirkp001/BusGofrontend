import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { scheduleService } from '../../services/index.js';
import BusDetails from '../../components/bus/BusDetails.jsx';
import Loader from '../../components/common/Loader.jsx';

const BusPage = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scheduleService
      .get(scheduleId)
      .then((d) => setSchedule(d.schedule))
      .catch(() => setSchedule(null))
      .finally(() => setLoading(false));
  }, [scheduleId]);

  if (loading) return <Loader fullScreen label="Loading trip…" />;

  if (!schedule) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-slate-600">This trip could not be found.</p>
        <Link to="/search" className="btn-secondary mt-4 inline-flex">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="btn-ghost mb-4 !px-2">
        <FiArrowLeft /> Back
      </button>

      <BusDetails schedule={schedule} />

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
        <Link
          to={`/booking/${schedule.id}/seats`}
          className={`btn-primary w-full sm:w-auto ${schedule.availableSeats === 0 ? 'pointer-events-none opacity-50' : ''}`}
        >
          {schedule.availableSeats === 0 ? 'Sold out' : 'Select seats'}
        </Link>
      </div>
    </div>
  );
};

export default BusPage;
