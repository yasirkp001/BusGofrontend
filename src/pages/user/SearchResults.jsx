import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { scheduleService, routeService } from '../../services/index.js';
import { todayStr, formatDate } from '../../utils/format.js';
import BusCard from '../../components/bus/BusCard.jsx';
import Loader from '../../components/common/Loader.jsx';

const BUS_TYPES = ['AC Sleeper', 'AC Seater', 'Non-AC Sleeper', 'Non-AC Seater'];

const SearchResults = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({
    source: params.get('source') || '',
    destination: params.get('destination') || '',
    date: params.get('date') || todayStr(),
  });
  const [type, setType] = useState('');
  const [sort, setSort] = useState('departure');
  const [busSearch, setBusSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    routeService.cities().then((d) => setCities(d.cities)).catch(() => {});
  }, []);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const query = {
        source: params.get('source') || undefined,
        destination: params.get('destination') || undefined,
        date: params.get('date') || undefined,
        type: type || undefined,
        sort,
      };
      const data = await scheduleService.search(query);
      setResults(data.schedules);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [params, type, sort]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // Client-side bus name filter on top of server results
  const q = busSearch.trim().toLowerCase();
  const displayed = q
    ? results.filter(
        (s) =>
          s.bus?.name?.toLowerCase().includes(q) ||
          s.bus?.operator?.toLowerCase().includes(q)
      )
    : results;

  const applySearch = (e) => {
    e.preventDefault();
    setBusSearch(''); // reset bus name filter on new route search
    setParams({ source: form.source, destination: form.destination, date: form.date });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Modify search */}
      <form onSubmit={applySearch} className="card grid gap-3 p-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
        <select className="input" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
          <option value="">From</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className="input" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}>
          <option value="">To</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="date" min={todayStr()} className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <button type="submit" className="btn-primary">
          <FiSearch /> Update
        </button>
      </form>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="space-y-4">
          {/* Bus name search */}
          <div className="card p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Bus name</h3>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                className="input pl-9 pr-8 text-sm"
                placeholder="Search operator…"
                value={busSearch}
                onChange={(e) => setBusSearch(e.target.value)}
              />
              {busSearch && (
                <button
                  onClick={() => setBusSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FiX size={13} />
                </button>
              )}
            </div>
          </div>

          <div className="card p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Sort by</h3>
            <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="departure">Departure time</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="card p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Bus type</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="radio" name="type" checked={type === ''} onChange={() => setType('')} /> All types
              </label>
              {BUS_TYPES.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="radio" name="type" checked={type === t} onChange={() => setType(t)} /> {t}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              {params.get('source') || 'All'} → {params.get('destination') || 'All'}
            </h2>
            <p className="text-sm text-slate-500">
              {formatDate(params.get('date'))} • {loading ? '…' : `${displayed.length} buses`}
            </p>
          </div>

          {loading ? (
            <Loader label="Finding buses…" />
          ) : displayed.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-slate-600">
                {busSearch ? `No buses found matching "${busSearch}".` : 'No buses found for this search.'}
              </p>
              {busSearch ? (
                <button onClick={() => setBusSearch('')} className="btn-secondary mt-4">
                  Clear search
                </button>
              ) : (
                <button onClick={() => navigate('/')} className="btn-secondary mt-4">
                  Change search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {displayed.map((s) => (
                <BusCard key={s.id} schedule={s} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchResults;
